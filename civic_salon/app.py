import os
from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
from datetime import datetime
from civic_salon.crawl.scraper import UniversalScraper 
from civic_salon.chain.post_geny import PostHelper

llm_deployment_name = os.getenv('deployment_name')




tags_metadata = [
    {
        "name":"ok",
        "description": "Connection status test."
    },
    {
        "name":"get_prompt",
        "description": "Get the user query from front-end."
    },
    {
        "name":"get_post_link",
        "descripton": "Get the post link from the front-end"
    }

]



app = FastAPI(
    title='civic salon- api',
    docs_url="/docs",
    openapi_url="/openapi.json",
    openapi_tags=tags_metadata
)
ph = PostHelper()

# Define a function to get a database session


@app.get('/ok', tags=['ok'])
async def ok_endpoint():
    return {'message':'ok'}


@app.get("/get_prompt", tags=['get_prompt'])
async def get_prompt(query: str = Query(..., title="User Query", description="User's question")):
    return query


@app.get("/get_post_link", tags=['retrieve post link'])
async def get_post_link(post_id: str = Query(..., description="The ID of the post"), 
                        post_link: str = Query(..., description="The URL link to the post")):
    if not post_id or not post_link:
        raise HTTPException(status_code=400, detail="post_id and post_link are required.")
    
   
    return {
        "post_id": post_id,
        "post_link": post_link
    }

@app.post("related_article")
async def related_article(post_id: str = Query(..., description="The ID of the post"),
                          post_link: str = Query(..., description="The URL link to the post")):
    try:
        scraper = UniversalScraper()
        url_content = scraper.get_page_content(post_link)
        title = url_content.get('title', '')
        similar_articles = ph.post_summary(title, 3)

        return post_id, title, similar_articles
    except Exception as e:
        return {"error": str(e)}

@app.post("article_suggested_prompt")
async def article_suggested_prompt(post_id: str = Query(..., description="The ID of the post"),
                                   post_title: str = Query(..., description="The article title, or user's prompt")):
    try:
        insight_questions = ph.question_generate(post_title)
        return post_id, insight_questions
    except Exception as e:
        return {"error": str(e)}




if __name__ == '__main__':
    app.run()



