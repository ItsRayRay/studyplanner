import { OpenAI } from "langchain/llms/openai";
import { OPENAI_API_KEY } from "$env/static/private"
import { lastMessageFromChat } from "$lib/ChatBox.svelte";
import { json } from "@sveltejs/kit";




export const GET = async () => {

  // const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });

 //   const res = await model.call(
    //    "hello world"
  //    );

  //  return new Response(JSON.stringify({message: console.log(lastMessageFromChat)}),{ status: 200})

  return json(lastMessageFromChat)
  
}

