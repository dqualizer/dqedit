import { DQAPI_HOST } from "$env/static/private";
import type { DomainStory } from "$models/domainstory/DomainStory";
import type { PageServerLoad } from "./$types";

const backendUrl = new URL(
  "/api/v2/domain-story",
  `http://${DQAPI_HOST}` || "http://localhost:8099",
);

export const load: PageServerLoad = async ({ fetch, params }) => {
  try {
    // Send a GET request to the backend's '/api/v2/domain-story/ids' endpoint.
    // The 'cache' option is set to 'no-store' to prevent caching of the response.
    const res = await fetch(`${backendUrl}/${params.domainStoryId}`, {
      cache: "no-store",
    });
    // If the response status is not OK, throw an error.
    if (!res.ok) {
      throw new Error(
        `Failed to fetch domain story IDs: ${res.status} ${res.statusText}`,
      );
    }
    const domainStory: DomainStory = await res.json();

    return {
      domainStory,
    };
  } catch (error) {
    // If an error occurs, log it to the console and rethrow it.
    console.error("Error fetching domain story IDs:", error);
    throw error;
  }
};
