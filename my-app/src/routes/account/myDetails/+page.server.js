import { fail } from "@sveltejs/kit";
import { db } from "$lib/database";
import { z } from "zod";

export async function load({cookies}) {

    const sessionId = cookies.get("session");
    
    const sesssion = await db.session.findUnique({
        where:
        {
            id: sessionId
        },
        select: {
            userId: true
        }
    });

    const user = await db.user.findUnique({
        where:
        {
            id: sesssion.userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            darkMode: true,
        },
    });

    return { user: user}
}


export const actions = {
    default: async ({ request, cookies }) => {
      // Get form data
      const data = await request.formData();
  
      const dataFields = Object.fromEntries(data);
  
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const phoneNumber = data.get("phone");
      const email = data.get("email");
      const darkModeVal = data.get("darkMode");

      var darkMode;

      if(darkModeVal != null){
        darkMode = true;
      }
      else{
        darkMode = false;
      }

      // Gets the session cookie and user data
      const sessionId = cookies.get("session");
    
        const session = await db.session.findUnique({
            where:
            {
                id: sessionId
            },
            select: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                }
            }
        });


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
      });
  
      // Check form submission passes validation
      try {
        accountSchema.parse(dataFields);
      } catch (error) {
        // Throw 422 (Unproccessable Content) error with messages from Zod
        return fail(422, { messages: error.errors.map((e) => e.message) });
      }
  
      // First checks if the email is the same or has it changed
      if(session.user.email != email)
      {
        // Check email isn't already taken
        const user = await db.user.findUnique({ where: { email } });

        if (user) {
            // Throw 400 (Bad Request) error
            return fail(400, { messages: ["Email address already in use"] });
          }
      }

        // Update user
        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                firstName,
                lastName,
                email,
                phoneNumber: phoneNumber,
                darkMode: darkMode,
            },
        });
    },
  };