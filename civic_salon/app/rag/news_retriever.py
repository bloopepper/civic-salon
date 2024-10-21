import os
import json
from databricks.vector_search.client import VectorSearchClient
from app.crawl.scraper import UniversalScraper 
from langchain.schema import Document



workspace_url = os.environ.get("WORKSPACE_URL")
sp_client_id = os.environ.get("SP_CLIENT_ID")
sp_client_secret = os.environ.get("SP_CLIENT_SECRET")

class SourceRetriever:

    def retrieve_news(self,query_text:str, num_results:int =5) -> dict:

        vsc = VectorSearchClient(
            workspace_url=workspace_url,
            service_principal_client_id=sp_client_id,
            service_principal_client_secret=sp_client_secret
        )

        index = vsc.get_index(endpoint_name="news-dataset-vector", index_name="workspace.source.all_news_vs_index")

        results = index.similarity_search(
            query_text = query_text,
            columns=["DateTime", "Title", "Category", "Link"],
            num_results = num_results
        )   
        return results

    def retrieve_news_content(self,search_vector_result:dict):
        scraper = UniversalScraper()
        docs = []
        for row in search_vector_result['result']['data_array']:
            doc = {
                'DateTime': row[0],
                'Title': row[1],
                'Category': row[2],
                'Link': row[3],
                'score': row[4]
            }
            docs.append(doc)
        output = {'doc': docs}
        for i in range(len(output['doc'])):
            indirect_url = output['doc'][i]['Link']
            direct_url = scraper.extract_links(indirect_url)
            url_content = scraper.get_page_content(direct_url[0])
            url_selected_content = {k: url_content[k] for k in ['title', 'main_content'] if k in url_content}
            result_json_object = json.dumps(url_selected_content, indent=4)
            output['doc'][i]['Direct_Link'] = direct_url
            output['doc'][i]['content'] = result_json_object


            # langchain_document = Document(
            #     page_content=output['content'],  
            #     metadata={
            #         'title': output['Title'],  
            #         'datetime': output['DateTime'],
            #         'category': output['Category'], 
            #         'link': output['Direct_Link'],  
            #         'score': output['score']  
            #     }
            # )

        langchain_document = [
            Document(
                page_content=raw_content['content'],  
                    metadata={
                        'title': raw_content['Title'],  
                        'datetime': raw_content['DateTime'],
                        'category': raw_content['Category'], 
                        'link': raw_content['Direct_Link'],  
                        'score': raw_content['score']  
                    }
            )
            for raw_content in output['doc']
        ]

        return langchain_document
