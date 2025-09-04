import {
  NewFeedback,
  Feedback,
  SuggestionFeedback,
  FeedbackGroupedByStatus,
  FeedbackWithStatusRaw,
} from "../types/feedback.types";
import { EditFeedbackFormValues } from "../types/form.types";
import { MutationResult } from "../types/mutation.types";
import { RoadmapFeedbackGroupedByStatus } from "../types/roadmap.types";
import {
  fetchWrapper,
  formatFeedbackForUI,
  groupFeedbackByStatus,
} from "../utils/helpers";

export const API_URL: string = import.meta.env.VITE_SUPABASE_URL;
export const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const HEADERS = {
  read: { apikey: API_KEY },
  write: {
    apikey: API_KEY,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  writeObject: {
    apikey: API_KEY,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    Accept: "application/vnd.pgrst.object+json",
  },
};

/* ---------------------------- */
/* Fetch feedback entries and groups them by status*/
export async function fetchAndGroupFeedback(
  // eslint-disable-next-line no-unused-vars
  access_token: string,
  userId: string,
  pageContext: "feedbackBoard"
): Promise<FeedbackGroupedByStatus>;

export async function fetchAndGroupFeedback(
  // eslint-disable-next-line no-unused-vars
  access_token: string,
  userId: string,
  pageContext: "developmentRoadmap"
): Promise<RoadmapFeedbackGroupedByStatus>;

export async function fetchAndGroupFeedback(
  access_token: string,
  userId: string,
  pageContext: "feedbackBoard" | "developmentRoadmap"
): Promise<FeedbackGroupedByStatus | RoadmapFeedbackGroupedByStatus> {
  const queryCondition =
    pageContext === "feedbackBoard"
      ? `?select=*,comments(count),upvotes:feedbackUpvotes(count),upvotesByCurrentUser:feedbackUpvotes(count)&upvotesByCurrentUser.userId=eq.${userId}`
      : `?status=not.eq.suggestion&select=*,comments(count),upvotes:feedbackUpvotes(count),upvotesByCurrentUser:feedbackUpvotes(count)&upvotesByCurrentUser.userId=eq.${userId}`;

  const feedbackListRaw = await fetchWrapper<FeedbackWithStatusRaw[]>(
    `${API_URL}/productRequests${queryCondition}`,
    {
      headers: {
        ...HEADERS.read,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const feedbackList = formatFeedbackForUI(feedbackListRaw);

  const feedbackGroupedByStatus = groupFeedbackByStatus(feedbackList);

  if (pageContext === "developmentRoadmap") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { suggestion, ...rest } = feedbackGroupedByStatus;

    return rest;
  }

  return feedbackGroupedByStatus;
}

/* Fetch feedback by id */
export async function fetchFeedbackById(
  access_token: string,
  userId: string,
  feedbackId: string
): Promise<FeedbackWithStatusRaw> {
  return fetchWrapper<FeedbackWithStatusRaw>(
    `${API_URL}/productRequests?id=eq.${feedbackId}&select=*,upvotes:feedbackUpvotes(count),upvotesByCurrentUser:feedbackUpvotes(count)&upvotesByCurrentUser.userId=eq.${userId}`,
    {
      headers: {
        ...HEADERS.read,
        Accept: "application / vnd.pgrst.object + json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
}

/* Submit new feedback */
export async function submitFeedback(
  accessToken: string,
  feedback: NewFeedback
): Promise<MutationResult<SuggestionFeedback>> {
  try {
    const data = await fetchWrapper<SuggestionFeedback>(
      `${API_URL}/productRequests`,
      {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          ...HEADERS.writeObject,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { success: true, payload: data };
  } catch (err) {
    console.error("Something went wrong inside SubmitFeedback", err);
    return { success: false, error: err };
  }
}

/* Edit feedback entry */
export async function editFeedback(
  accessToken: string,
  feedbackId: string,
  editedFeedback: EditFeedbackFormValues
): Promise<MutationResult<EditFeedbackFormValues>> {
  try {
    const data = await fetchWrapper<Feedback>(
      `${API_URL}/productRequests?id=eq.${feedbackId}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedFeedback),
        headers: { ...HEADERS.write, Authorization: `Bearer ${accessToken}` },
      }
    );

    const { title, category, status, description } = data;

    return { success: true, payload: { title, category, status, description } };
  } catch (err) {
    console.error("Something went wrong inside EditFeedback", err);
    return { success: false, error: err };
  }
}

/* Delete feedback entry */
export async function deleteFeedback(
  accessToken: string,
  feedbackId: string
): Promise<Feedback> {
  return fetchWrapper<Feedback>(
    `${API_URL}/productRequests?id=eq.${feedbackId}`,
    {
      method: "DELETE",
      headers: {
        ...HEADERS.read,
        Prefer: "return=representation",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

/* Update backend with current vote count after user's upvote/unvote actions */
export async function persistFeedbackVote(
  feedbackId: string,
  accessToken: string,
  userAuthId: string
) {
  try {
    const res = await fetch(`${API_URL}/feedbackUpvotes`, {
      method: "POST",
      body: JSON.stringify({ feedbackId, userId: userAuthId }),
      headers: { ...HEADERS.write, Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 409) {
      await fetch(
        `${API_URL}/feedbackUpvotes?feedbackId=eq.${feedbackId}&userId=eq.${userAuthId}`,
        {
          method: "DELETE",
          headers: { ...HEADERS.write, Authorization: `Bearer ${accessToken}` },
        }
      );

      return "unvoted";
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `HTTP Error: ${res.status}`);
    }

    await res.json();

    return "upvoted"; //decide what to return
  } catch (err) {
    console.error("Something went wrong while upvoting feedback", err);
    throw err;
  }
}
