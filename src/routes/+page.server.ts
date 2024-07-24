import { formSchema } from "$components/domainstory/schema";
import { DQAPI_HOST } from "$env/static/private";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";

const backendUrl = new URL(
  "/api/v2/domain-story",
  `http://${DQAPI_HOST}` || "http://localhost:8099",
);

/**
 * Fetches the domain story IDs from the backend.
 *
 * @throws {Error} If the fetch request fails or if there is an error parsing the response.
 */
export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Send a GET request to the backend's '/api/v2/domain-story/ids' endpoint.
    // The 'cache' option is set to 'no-store' to prevent caching of the response.
    const res = await fetch(`${backendUrl}/ids`, {
      cache: "no-store",
    });

    // If the response status is not OK, throw an error.
    if (!res.ok) {
      throw new Error(
        `Failed to fetch domain story IDs: ${res.status} ${res.statusText}`,
      );
    }

    const data: string[] = await res.json();

    // Parse the response as JSON and return it.
    return {
      domainStoryIds: data,
      form: await superValidate(zod(formSchema)),
    };
  } catch (error) {
    // If an error occurs, log it to the console and rethrow it.
    console.error("Error fetching domain story IDs:", error);
    throw error;
  }
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    fetch(`${backendUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return message(
      form,
      `Domain Stories ${form.data.files.map((f) => f.name).join(", ")} added.`,
    );
  },
};
