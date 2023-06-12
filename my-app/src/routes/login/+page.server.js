import { redirect, fail } from "@sveltejs/kit";
import { db } from "$lib/database";
import bcrypt from "bcrypt";

// Redirect if the user is logged in
export const load = ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};

export const actions = {
  default: async ({ cookies, request }) => {
    // Get form data
    const data = await request.formData();

    const email = data.get("email");
    const password = data.get("password");

    // Get user from database
    const user = await db.user.findUnique({ where: { email } });

    // Throw error if user isn't found
    if (!user) {
      return fail(400, { messages: ["Incorrect email or password"] });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    // Throw error if passwords don't match
    // Note: We use the same error message for both cases as to not give attackers any additional information
    if (!passwordsMatch) {
      return fail(400, { messages: ["Incorrect email or password"] });
    }

    // Make sure a session doesn't already exist for that user
    const currentSession = await db.session.findUnique({
      where: {
        userId: user.id,
      },
    });

    // Delete old session if it exists
    if (currentSession) {

      await db.session.delete({
        where: { id: currentSession.id },
      });
    }

    // Create a new session
    const session = await db.session.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
      },
    });

    // Set session cookie
    // Code modified from https://joyofcode.xyz/sveltekit-authentication-using-cookies#user-login
    cookies.set("session", session.id, {
      // Send cookie for every page
      path: "/",
      // Server side only cookie so you can't use `document.cookie`
      httpOnly: true,
      // Only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: "strict",
      // Not using HTTPS
      secure: false,
      // Set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    });

    // Redirect the user to the homepage
    throw redirect(303, "/");
  },
};
