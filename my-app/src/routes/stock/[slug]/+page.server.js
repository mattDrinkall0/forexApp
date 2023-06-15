import { db } from "$lib/database";
import {formatDate} from "$lib/formatDate";

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
    

    return{ symbol: slug, name: companyName.name, weekNames, weekPrices}
}
