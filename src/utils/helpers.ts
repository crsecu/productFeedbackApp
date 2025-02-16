import { User } from "../features/user/user.types";
import { submitComment } from "../services/apiComment";
import { fetchUserList, updateCommentCount } from "../services/apiFeedback";
import {
  CommentAuthor,
  NewCommentType,
  NewReplyType,
} from "../types/comment.types";
import { FeedbackType } from "../types/feedback.types";

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

//Filters a list of feedback entries based on the specified status
export function filterFeedbackByStatus(
  feedbackList: FeedbackType[],
  status: string
) {
  return feedbackList.filter(
    (feedbackEntry) => feedbackEntry.status === status
  );
}

//Sort feedback list
export function sortFeedbackList(
  list: FeedbackType[],
  category: string,
  sortByOption: string
) {
  const feedbackList =
    category === "all"
      ? [...list]
      : list.filter((feedbackEntry) => feedbackEntry.category === category);

  return [...feedbackList].sort((a, b) => {
    switch (sortByOption) {
      case "leastUpvotes":
        return a.upvotes - b.upvotes;
      case "mostComments":
        return b.commentCount - a.commentCount;
      case "leastComments":
        return a.commentCount - b.commentCount;
      default: //mostUpvotes
        return b.upvotes - a.upvotes;
    }
  });
}

/* Function used by the FeedbackDetailPage action function to handle the submission 
of comments/replies for a specific feedback entry. It updates the backend by creating 
a new comment or reply based on the mode ("comment" or "reply") and increments the comment count. */
export async function postCommentOrReply(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: Iterable<readonly [PropertyKey, any]>,
  feedbackId: string
) {
  const data = Object.fromEntries(formData);

  const {
    content,
    currentCommentCount: commentCount,
    author: authorJSON,
    mode,
    parentId,
    parentType,
    replyingTo,
  } = data;

  const currentCommentCount: number = JSON.parse(commentCount as string);
  const author: CommentAuthor = JSON.parse(authorJSON as string);

  if (mode === "comment") {
    const newComment: NewCommentType = {
      feedbackId,
      type: mode,
      parentId: null,
      parentType: null,
      content: content as string,
      user: author,
    };

    await submitComment(newComment);
  }

  if (mode === "reply") {
    const newReply: NewReplyType = {
      feedbackId,
      type: mode,
      parentId: parentId as string,
      parentType: parentType as "comment" | "reply",
      content: content as string,
      user: author,
      replyingTo: replyingTo as string,
    };

    await submitComment(newReply);
  }

  await updateCommentCount(feedbackId, currentCommentCount + 1);

  return null;
}

/* Function if any form field values have changed from their initial state */
export function hasFormChanged(initialValues, currentValues) {
  const formFieldNames = Object.keys(initialValues);

  return formFieldNames.some(
    (key) => initialValues[key] !== currentValues[key]
  );
}
