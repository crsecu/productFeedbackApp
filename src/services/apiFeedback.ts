import { Feedback } from "../features/feedback/feedback.types";

const API_URL: string = "http://localhost:9000"; //mock API generated by JSON server from data/data.json file

/* Fetch Feedback List */
export async function fetchAllFeedback() {
  const res = await fetch(`${API_URL}/productRequests`);

  //throw an exeception if the  server responds with a 400 Bad Request error,
  // as fetch does not handle HTTP errors automatically
  if (!res.ok) throw Error("Failed getting Feedback Data");

  const data = await res.json();
  return data;
}

/* Fetch feedback by id */
export async function fetchFeedbackById(feedbackId: string | undefined) {
  //type check against undefined above
  const res = await fetch(`${API_URL}/productRequests/${feedbackId}`);

  //throw an exeception if the  server responds with a 400 Bad Request error,
  // as fetch does not handle HTTP errors automatically
  if (!res.ok) throw Error("Failed getting Feedback Data");

  const data = await res.json();
  return data;
}

/* Submit new feedback */
interface NewFeedback {
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
}

export async function submitFeedback(feedback: NewFeedback) {
  try {
    const res = await fetch(`${API_URL}/productRequests`, {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();

    return data;
  } catch {
    throw Error("Failed submitting Feedback");
  }
}

/* Edit feedback entry */
export async function editFeedback(
  feedbackId: string,
  editedFeedback: {
    title: string;
    description: string;
    category: string;
    status: string;
  }
) {
  try {
    const res = await fetch(`${API_URL}/productRequests/${feedbackId}`, {
      method: "PATCH",
      body: JSON.stringify(editedFeedback),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data: Feedback = await res.json();
    return data;
  } catch {
    throw Error("Failed editing Feedback");
  }
}

/* Delete feedback entry */
export async function deleteFeedback(feedbackId: string) {
  try {
    const res = await fetch(`${API_URL}/productRequests/${feedbackId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log(
        `Feedback entry with id ${feedbackId} was deleted succesfully`
      );
    } else {
      throw Error();
    }
  } catch {
    throw Error(
      `There was an error deleting feedback entry with id ${feedbackId}`
    );
  }
}

/* Upvote feedback entry */
export async function upvoteFeedback(feedbackId: string, voteCount: number) {
  /* TO DO:  update function name*/
  try {
    const res = await fetch(`${API_URL}/productRequests/${feedbackId}`, {
      method: "PATCH",
      body: JSON.stringify({ upvotes: voteCount }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log(`Feedback entry with id ${feedbackId} has been UPVOTED`);
    } else {
      throw Error();
    }

    const data = await res.json();
    return data;
  } catch {
    throw Error(
      `There was an error UPVOTING feedback entry with id ${feedbackId}`
    );
  }
}
