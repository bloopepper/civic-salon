import os
import json
from langchain_community.chat_models import ChatDatabricks
from openai import OpenAI

DATABRICKS_TOKEN = os.environ.get('DATABRICKS_TOKEN')
WORKSPACE_URL = os.environ.get('WORKSPACE_URL')

class NewsGeny:
    def __init__(self):
        self.client = OpenAI(
            api_key=DATABRICKS_TOKEN,
            base_url=f"{WORKSPACE_URL}/serving-endpoints"
        )
        self.model = "dbrx_instruct_v3"

    def _generate_response(self, system_content: str, user_content: str, temperature: float, top_p: float, max_tokens: int) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_content}
            ],
            temperature=temperature,
            top_p=top_p,
            max_tokens=max_tokens
        )
        return response.choices[0].message.content

    def article_summarize(self, user_content: str, temperature: float = 0, top_p: float = 0.95, max_tokens: int = 500) -> str:
        system_content = (
            "You are a helpful assistant that summarizes texts. "
            "You will use one sentence to describe the event with date information. "
            # "Each news show as one bullet item."
        )
        return self._generate_response(system_content, user_content, temperature, top_p, max_tokens)

    def question_generate(self, user_content: str, temperature: float = 0.7, top_p: float = 0.9, max_tokens: int = 300) -> str:
        system_content = (
            "As an intelligent and friendly assistant, your goal is to read the news and ask insightful, curious questions. "
            "Focus on helping the user think deeper about the topics, explore various perspectives, and connect the news to everyday life. "
            "You should ask questions that are engaging, easy to understand, and make the user feel comfortable. "
            "Please design the question as bullet list with dot symbol. Create three questions as maximum."
        )
        response_str = self._generate_response(system_content, user_content, temperature, top_p, max_tokens)
        # Convert the response to JSON format
        questions = response_str.split("\n")
        questions = [q.strip() for q in questions if q.strip()]
        return json.dumps({"questions": questions}, ensure_ascii=False)
        
        # return self._generate_response(system_content, user_content, temperature, top_p, max_tokens)