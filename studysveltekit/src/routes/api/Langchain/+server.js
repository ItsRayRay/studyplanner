import { json } from '@sveltejs/kit';
import { OpenAI } from "langchain/llms/openai";
import { OPENAI_API_KEY } from '$env/static/private';

 
// request is the data that gets pushed from the front
export const POST =  async ({request}) => {


  const myBody = await request.json()
  const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });

  const res = await model.call(
    myBody.message
  );


  
  return new Response(JSON.stringify({
    

    name:'AIBOT',
    message: res

    
  }), {status:200})
}