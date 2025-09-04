import { NewCommentOrReply } from "../types/comment.types";
import { MutationResult } from "../types/mutation.types";
import { fetchWrapper } from "../utils/helpers";
import { API_KEY, API_URL } from "./apiFeedback";

/* Fetch Comments for Detail Page */
export async function fetchComments(feedbackId: string) {
  return fetchWrapper(`${API_URL}/comments?feedbackId=${feedbackId}`);
}

//Submit comment
export async function submitComment(
  // accessToken?: string,
  commentData: NewCommentOrReply
): Promise<MutationResult<NewCommentOrReply>> {
  try {
    const newComment = await fetchWrapper<NewCommentOrReply>(
      `${API_URL}/comments`,
      {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          apikey: API_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
          Accept: "application / vnd.pgrst.object + json",
          // Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, payload: newComment };
  } catch (err) {
    console.error(
      "Something went wrong while submitting new comment",
      typeof err
    );
    return { success: false, error: err };
  }
}
