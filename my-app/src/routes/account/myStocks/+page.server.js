import { fail } from "@sveltejs/kit";
import { db } from "$lib/database";
import { z } from "zod";

export async function load({cookies}) {

    const sessionId = cookies.get("session");
    
    const session = await db.session.findUnique({
        where:
        {
            id: sessionId
        },
        select: {
            userId: true
        }
    });

    const userStocks = await db.userStocks.findMany({
        where:
        {
            userId: session.userId
        },
        select: {
            id: true,
            userId: true,
            stockId: true,
            dateAdded: true,
            stock: {
                select: {
                    id: true,
                    name: true,
                    symbol: true,
                },
            },
        },
    });

    return { stockList: userStocks };
}

export const actions = {
  removeStock: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");

    await db.userStocks.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
  addStock: async ({ request, cookies }) => {
    const data = await request.formData();
    const symbol = data.get("symbol");
    const name = data.get("name");

    await db.companies.upsert({
      where: {
        symbol: symbol,
      },
      update: {
        name: name,
      },
      create: {
        symbol: symbol,
        name: name,
      },
    });

    // Adds the company to the user's list of stocks
    const sessionId = cookies.get("session");
    
    const session = await db.session.findUnique({
        where:
        {
            id: sessionId
        },
        select: {
            userId: true
        }
    });

    // Gets the stock
    const stock = await db.companies.findUnique({
        where:
        {
            symbol: symbol
        },
        select: {
            id: true,
        }
    });

    await db.userStocks.upsert({
      where: {
        userId_stockId: {
          userId: session.userId,
          stockId: stock.id,
        },
      },
      update: {},
      create: {
        userId: session.userId,
        stockId: stock.id,
      },

    });

  },
};