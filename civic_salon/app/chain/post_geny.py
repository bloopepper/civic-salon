from app.rag.news_retriever import SourceRetriever
from app.llm.chat_news_helper import NewsGeny
import json

retriever = SourceRetriever()
geny = NewsGeny()

class PostHelper:
    def post_summary(self,query_text: str, num_results: int = 5) -> list:
        # Use the instance method on the retriever object
        retrieved_result = retriever.retrieve_news(query_text, num_results)
        final_result = retriever.retrieve_news_content(retrieved_result)
        result_list = []

        for document in final_result:
            news_content = document.page_content
            summary = geny.article_summarize(news_content)

            # Extract the fields, ensuring correct handling of 'link'
            news_data = {
                "Datetime": document.metadata.get('datetime'),
                "direct_link": document.metadata.get('link', [])[0] if isinstance(document.metadata.get('link'), list) else document.metadata.get('link'),  # Ensure it's a list
                "summary": summary
            }

            result_list.append(news_data)

        return result_list



    def question_generate(self,query_text:str)->json:
        questions = geny.question_generate(query_text)
        
        return questions