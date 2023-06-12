// Code modified from https://joyofcode.xyz/sveltekit-authentication-using-cookies#user-logout
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";

// /logout isn't a page that users should be able to visit, so redirect them to the home page
export const load = async () => {
  throw redirect(302, "/");
};

// Handle form submission to /logout
export const actions = {
  default: async ({ cookies }) => {
    // Get current session ID
    const sessionId = cookies.get("session");

    if (!sessionId) {
      throw redirect(303, "/");
    }

    // Clear the session cookie
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    // Remove the session from the database
    await db.session.delete({
      where: { id: sessionId },
    });

    // Redirect the user to the home page
    throw redirect(303, "/");
  },
};
