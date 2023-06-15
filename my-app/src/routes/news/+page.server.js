import { db } from "$lib/database";

export async function load() {
  let key = 'K9A1VB4KEB375JED';
  let data;
  const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&apikey=' + key;
  const result = await fetch(url);
  
  // Checks if the API is working
  if(!result.ok){
    console.log("News API Error: " + result.status);
  }
  else{
    data = await result.json();
  }

  return { news: data['feed'] }

}
