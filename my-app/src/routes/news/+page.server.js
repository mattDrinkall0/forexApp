import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export async function load() {
  let key = 'K9A1VB4KEB375JED';
  let data;
  const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&limit=100&apikey=' + key;
  const result = await fetch(url);
  
  // Checks if the API is working
  if(!result.ok){
    console.log("News API Error: " + result.status);
  }
  else{
    data = await result.json();
  }

  if(!data['feed']){
    throw redirect(303, "/free-plan");
}

  const validArticles = data['feed'].filter(article => 
    article.summary && article.banner_image && article.source && (article.banner_image != "https://www.benzinga.com/next-assets/images/schema-image-default.png"));

  return { news: validArticles }
}
