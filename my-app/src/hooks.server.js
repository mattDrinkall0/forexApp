import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

// Code modified from https://joyofcode.xyz/sveltekit-authentication-using-cookies#passing-user-data-to-pages
export const handle = async ({ event, resolve }) => {
  // Get the session ID from cookies
  const sessionId = event.cookies.get("session");

  const redirectIfProtected = () => {
    if (event.url.pathname.startsWith("/account")) {
      throw redirect(303, "/");
    }
  };

  // If there is no current session, redirect if accessing a protected route, otherwise load the page as normal
  if (!sessionId) {
    redirectIfProtected();
    return await resolve(event);
  }

  // Fetch the session information from the database
  const session = await db.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    // Clear the session cookie if there's no matching session on the server
    if (sessionId) {
      event.cookies.set("session", "", {
        path: "/",
        expires: new Date(0),
      });
    }

    // No session found, so redirect if the route is protectedd
    redirectIfProtected();
    return await resolve(event);
  }

  // Allow user data to be accessible on all routes
  event.locals.user = session.user;

  // Continue to load the page
  return await resolve(event);
};
