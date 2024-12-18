import { ActionFunctionArgs } from "react-router-dom";
import { submitComment } from "../services/apiComment";
import { CommentAuthor, NewComment } from "../features/feedback/feedback.types";
import { updateCommentCount } from "../services/apiFeedback";

//Submit New Comment Action
export async function submitCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("data from comment action", data);

  const {
    content,
    currentCommentCount: commentCount,
    author: authorJSON,
  } = data;

  const currentCommentCount: number = JSON.parse(commentCount as string);
  const author: CommentAuthor = JSON.parse(authorJSON as string);

  const newComment: NewComment = {
    parentId: null,
    feedbackId,
    content: content as string,
    user: author,
    replies: [],
  };

  await submitComment(newComment);
  await updateCommentCount(feedbackId, currentCommentCount + 1);

  return null;
}
