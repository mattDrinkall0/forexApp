import { db } from "$lib/database";

export async function load({ params }) {
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

    // This is the load function where all the algorithms are going to work on predicting the stock price

    return{ symbol: slug, name: companyName.name}
}
