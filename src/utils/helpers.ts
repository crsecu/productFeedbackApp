import { User } from "../features/user/user.types";
import { fetchUserList } from "../services/apiFeedback";

/* Reusable Fetch Helper */
export async function fetchWrapper(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorDetails = await res.json();
      throw Error(errorDetails.error || `HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }

    throw error;
  }
}

/* The validateUserCredentials function fetches the user list from mock API and validates the input credentials
 */
export async function validateUserCredentials(name: string, username: string) {
  const userList: User[] = await fetchUserList();

  const validatedUser = userList.find((user) => {
    return (
      user.name.toLowerCase() === name.toLocaleLowerCase() &&
      user.username.toLowerCase() === username.toLowerCase()
    );
  });

  return validatedUser;
}

//Format category label
export function formatCategoryLabel(categoryLabel: string) {
  return categoryLabel.length === 2
    ? categoryLabel.toUpperCase()
    : categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);
}
