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
  commentCount: number
) {
  try {
    const newComment = await fetchWrapper(`${API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await updateCommentCount(
      newComment.feedbackId,
      commentCount + 1
    );

    return { success: true, payload: { commentCount: response.commentCount } };
  } catch (err) {
    console.error("Something went wrong while submitting new comment", err);
    return { success: false, error: err };
  }
}
