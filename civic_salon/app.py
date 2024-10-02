import os
from fastapi import FastAPI, Query, Depends
from pydantic import BaseModel

from datetime import datetime

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

]



app = FastAPI(
    title='civic salon- api',
    docs_url="/docs",
    openapi_url="/openapi.json",
    openapi_tags=tags_metadata
)


# Define a function to get a database session


@app.get('/ok', tags=['ok'])
async def ok_endpoint():
    return {'message':'ok'}


@app.get("/get_prompt", tags=['get_prompt'])
async def get_prompt(query: str = Query(..., title="User Query", description="User's question")):
    return query





if __name__ == '__main__':
    app.run()



