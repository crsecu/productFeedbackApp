import { NewCommentType, NewReplyType } from "../types/comment.types";
const API_URL: string = "http://localhost:9000"; //mock API generated by JSON server from data/data.json file

/* Fetch Comments for Detail Page */
export async function fetchComments(feedbackId: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/comments?feedbackId=${feedbackId}`);
    if (res.ok) {
      console.log("Comments retrieved successfully.");
    } else {
      throw Error();
    }

    return await res.json();
  } catch {
    throw Error(`There was an error retrieving comments.`);
  }
}

//Submit comment
export async function submitComment(
  commentData: NewCommentType | NewReplyType
) {
  try {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Comment submission successful");
    } else {
      throw Error();
    }

    return res.json();
  } catch {
    throw Error(`There was an error submitting your comment.`);
  }
}
