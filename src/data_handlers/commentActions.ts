import { ActionFunctionArgs } from "react-router-dom";
import { submitComment } from "../services/apiComment";
import { User } from "../features/user/user.types";
import { updateCommentCount } from "../services/apiFeedback";

//Submit New Comment Action
export async function submitCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();

  const content = formData.get("content");
  const currentCommentCountJSON = formData.get("currentCommentCount");

  const authorJSON = formData.get("author");

  if (!authorJSON || !currentCommentCountJSON) throw new Error();
  const currentCommentCount = JSON.parse(currentCommentCountJSON as string);
  const author = JSON.parse(authorJSON as string);

  const newComment = {
    feedbackId,
    content: content as string,
    user: author as User,
  };

  await submitComment(newComment);
  await updateCommentCount(feedbackId, currentCommentCount + 1);

  return null;
}
