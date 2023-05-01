import { json } from '@sveltejs/kit';

 

export const POST =  async ({request}) => {
  const myBody = await request.json()
  
  return new Response(JSON.stringify({mypost: myBody}), {status:200})
}