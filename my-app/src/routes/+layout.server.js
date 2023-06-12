import fetch from 'node-fetch';
import { db } from "$lib/database";

export const load = async ({ locals, fetch }) => {

  // First of all checks the database to see if it has any stocks
  const stocks = await db.companies.findMany();

  if(stocks.length == 0) {
    // Gets all the stocks from the API
    let key = 'K9A1VB4KEB375JED';
    const url = 'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=' + key;
    const result = await fetch(url);
    const text = await result.text();

    // Splits the text into an array of each lines
    const lines = text.split('\n');

    const companyData = lines.map(item => {
      const [symbol, name] = item.split(',');

      return {
        symbol: symbol,
        name: name,
      };
    });
    
    try {
      // Import all company data into the database
      for (let company of companyData) {
        try {
          await db.companies.create({
            data: company,
          });
        } catch (error) {
          console.error('Error importing a company:', error);
        }
      }
  
      console.log(`${companyData.length} companies imported successfully.`);
    } catch (error) {
      console.error('Error importing company data:', error);
    }
  }

  // Allow user data and basket count to be accessible on all routes
  return {
    stocks: stocks,
    user: locals.user,
  };
};
