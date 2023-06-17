import { db } from "$lib/database";
import {formatDate} from "$lib/formatDate";
import { redirect } from "@sveltejs/kit";
import { parse } from "cookie";

export async function load({ params, cookies }) {
	const slug = params.slug;

    // Finds the name of the company
    const companyName = await db.companies.findUnique({
        where: {
            symbol: slug,
        },
        select: {
            name: true,
        }
    });

    
    const sessionId = cookies.get("session");
    
    const session = await db.session.findUnique({
        where:
        {
            id: sessionId
        },
        select: {
            user: {
                select: {
                    key: true,
                },
            }
        }
    });

    // Checks if the user has a key
    if(!session.user.key){
        // Redirects them to the API key page
        throw redirect(303, "/account/apiKey");
    }


    const key = session.user.key;
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + slug + '&apikey=' + key;
    const result = await fetch(url);
    let data;
  
    // Checks if the API is working
    if(!result.ok){
      console.log("News API Error: " + result.status);
    }
    else{
      data = await result.json();
    }
    
    const weeklyData = data['Weekly Time Series'];

    let weekNames = [];
    let weekPrices = [];

    for (let week in weeklyData) {
        weekNames.push(week);

        // Saves as a float
        weekPrices.push(parseFloat(weeklyData[week]['4. close']));
    }

    // Get the first date in the "Weekly Time Series"
    let firstDate = weekNames[0];

    // Get the open value for the first date
    let open = weeklyData[firstDate]['1. open'];
    let close = weeklyData[firstDate]['4. close'];
    let high = weeklyData[firstDate]['2. high'];
    let low = weeklyData[firstDate]['3. low'];
    let volume = weeklyData[firstDate]['5. volume'];

    // Gets the news sentiment data
    let newsData;
    const newsUrl = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=' + slug +'&sort=LATEST&limit=50&apikey=' + key;
    const newsResult = await fetch(newsUrl);
    let sentimentScore = 0.000;
    let validArticles = [];
    
    // Checks if the API is working
    if(newsResult.status == 429){
        console.log("News API Error: " + newsResult.status);
    }
    else if(!newsResult.ok){
      console.log("News API Error: " + newsResult.status);
    }
    else{
        newsData = await newsResult.json();
        if(newsData && newsData['feed']) {
            validArticles = newsData['feed'].filter(article => 
                article.summary && article.banner_image && article.source && 
                (article.banner_image != "https://www.benzinga.com/next-assets/images/schema-image-default.png"));
        
            // Gets the sentiment score
            for (let article of validArticles) {
                sentimentScore += parseFloat(article.overall_sentiment_score);
            }
        
            // Gets the average sentiment score
            sentimentScore = (sentimentScore / validArticles.length);
        } else {
            console.log("Invalid response data from the News API");
        }
    }


    return{ symbol: slug, name: companyName.name, weekNames, weekPrices, open, close, high, low, volume, news: validArticles, sentimentScore: sentimentScore.toFixed(2)};
}
