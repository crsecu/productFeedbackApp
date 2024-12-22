import { ActionFunctionArgs } from "react-router-dom";
import { submitComment } from "../services/apiComment";
import {
  CommentAuthor,
  CommentReply,
} from "../features/feedback/feedback.types";
import { updateCommentCount } from "../services/apiFeedback";
import { Comment } from "../features/feedback/feedback.types";

//Submit New Comment Action
export async function submitCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("formData", data);
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
    const newComment: Comment = {
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
    const newReply: CommentReply = {
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
