from rag.news_retriever import SourceRetriever
from llm.chat_news_helper import NewsGeny
import json

retriever = SourceRetriever()
geny = NewsGeny()

class PostHelper:
    def post_summary(query_text:str, num_results:int=5)->list:
        retrieved_result = SourceRetriever.retrieve_news(query_text, num_results)
        final_result = SourceRetriever.retrieve_news_content(retrieved_result)
        result_list = []

        for document in final_result:
            news_content = document.page_content  
            summary = geny.article_summarize(news_content)  
            
            # 提取需要的字段
            news_data = {
                "Datetime": document.metadata.get('datetime'),
                "direct_link": document.metadata.get('link', [])[0] if document.metadata.get('link') else None,  # 取得第一個鏈接
                "summary": summary
            }
            
            result_list.append(news_data)

        return result_list



    def question_generate(query_text:str)->json:
        questions = geny.question_generate(query_text)
        
        return questions