import { redirect, fail } from "@sveltejs/kit";
import { db } from "$lib/database";
import { z } from "zod";
import bcrypt from "bcrypt";

// Redirect if the user is logged in
export const load = ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};

export const actions = {
  default: async ({ request }) => {
    // Get form data
    const data = await request.formData();

    const dataFields = Object.fromEntries(data);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const phoneNumber = data.get("phoneNumber");
    const email = data.get("email");
    const password = data.get("password");

    // Zod schema for valid form fields
    const accountSchema = z.object({
      firstName: z
        .string()
        .min(1, { message: "First name is required" })
        .trim(),
      lastName: z.string().min(1, { message: "Last name is required" }).trim(),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must be at most 32 characters" }),
    });

    // Check form submission passes validation
    try {
      accountSchema.parse(dataFields);
    } catch (error) {
      // Throw 422 (Unproccessable Content) error with messages from Zod
      return fail(422, { messages: error.errors.map((e) => e.message) });
    }

    // Check email isn't already taken
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      // Throw 400 (Bad Request) error
      return fail(400, { messages: ["Email address already in use"] });
    }

    // Hash and salt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Redirect the user to the homepage
    throw redirect(303, "/login");
  },
};
