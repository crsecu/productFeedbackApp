import { BaseCommentType } from "../types/comment.types";
import { fetchWrapper } from "../utils/helpers";
import { updateCommentCount } from "./apiFeedback";
import { API_URL } from "./apiFeedback";

/* Fetch Comments for Detail Page */
export async function fetchComments(feedbackId: string) {
  return fetchWrapper(`${API_URL}/comments?feedbackId=${feedbackId}`);
}

//Submit comment
export async function submitComment(
  // commentData: NewCommentType | NewReplyType
  commentData: BaseCommentType,
  currentCount: number
) {
  try {
    const submitCommentRequest = fetchWrapper(`${API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updateCountRequest = submitCommentRequest.then((newComment) =>
      updateCommentCount(newComment.feedbackId, currentCount + 1)
    );

    const [submittedComment, updatedCount] = await Promise.all([
      submitCommentRequest,
      updateCountRequest,
    ]);
    console.log("check promises returned", submittedComment, updatedCount);
    // const response = await updateCommentCount(
    //   newComment.feedbackId,
    //   commentCount + 1
    // );

    return { success: true, payload: { newComment: submittedComment } };
    return { success: true };
  } catch (err) {
    console.error("Something went wrong while submitting new comment", err);
    return { success: false, error: err };
  }
}
