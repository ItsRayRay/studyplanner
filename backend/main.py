from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import os
from dotenv import load_dotenv
from langchain.llms import OpenAI


#App object
app = FastAPI()

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")


origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post('/')
async def receive_data(request: Request):
    data = await request.json()  # Access the JSON data from the request body

    if isinstance(data, dict):
        # Check if data is a dictionary
        chat_content = data.get('chatContent')  # Access the chatContent array from the data

        if chat_content:
            # chatContent array is present in the request data
            print('Received chatContent:', chat_content)
            # Iterate through the chatContent array and access name and message properties
            for item in chat_content:
                name = item.get('name')
                message = item.get('message')
                print('Name:', name, 'Message:', message)
            return {'status': 'success'}
        else:
            # chatContent array is not present in the request data
            return {'status': 'failure', 'message': 'chatContent not found'}
    else:
        return {'status': 'failure', 'message': 'Invalid request data'}



@app.get("/")
def read_root():
    return {"ping":"pong"}


llm = OpenAI(temperature=0.9)

text = "What would be a good company name for a company that makes colorful socks?"
print(llm(text))