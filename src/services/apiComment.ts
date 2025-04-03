import { BaseCommentType } from "../types/comment.types";
import { MutationResult } from "../types/feedback.types";
import { fetchWrapper } from "../utils/helpers";
import { updateCommentCount } from "./apiFeedback";
import { API_URL } from "./apiFeedback";

/* Fetch Comments for Detail Page */
export async function fetchComments(feedbackId: string) {
  return fetchWrapper(`${API_URL}/comments?feedbackId=${feedbackId}`);
}

//Submit comment
export async function submitComment(
  commentData: BaseCommentType,
  currentCount: number
): Promise<MutationResult<BaseCommentType>> {
  try {
    const createCommentPromise = fetchWrapper<BaseCommentType>(
      `${API_URL}/comments`,
      {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updateCommentCountPromise = createCommentPromise.then((newComment) =>
      updateCommentCount(newComment.feedbackId, currentCount + 1)
    );

    const [newComment, updatedCount] = await Promise.all([
      createCommentPromise,
      updateCommentCountPromise,
    ]);
    console.log("check promises returned", newComment, updatedCount);

    return { success: true, payload: newComment };
  } catch (err) {
    console.error(
      "Something went wrong while submitting new comment",
      typeof err
    );
    return { success: false, error: err };
  }
}
