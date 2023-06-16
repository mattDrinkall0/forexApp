import { fail } from "@sveltejs/kit";
import { db } from "$lib/database";

export async function load({cookies}) {

  const sessionId = cookies.get("session");
    
  const session = await db.session.findUnique({
      where:
      {
          id: sessionId
      },
      select: {
          user: {
            select: {
              id: true,
              key: true,
            }
          }
      }
  });

  return { user: session.user}
}


export const actions = {
    default: async ({request, cookies}) => {

      const data = await request.formData();
      const key = data.get("key");

      const sessionId = cookies.get("session");

      const session = await db.session.findUnique({
        where:
        {
            id: sessionId
        },
        select: {
            userId: true,
        }
    });

      // Checks the API key is valid
      const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=' + key;
      const response = await fetch(url);

      // Checks if the response is valid
      if(!response.ok){
        return fail(400, { key, incorrect: true });
      }
      else{
        try{
          const addKey = await db.user.update({
            where: {
              id: session.userId
            },
            data: {
              key: key
            }
          });
        }
        catch{
          return fail(400, { key, incorrect: true });
        }
      }
    },
  };