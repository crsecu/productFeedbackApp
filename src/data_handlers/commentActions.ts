import { ActionFunctionArgs } from "react-router-dom";
// Add New Comment Action
export async function createCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const content = formData.get("content");
  const authorJSON = formData.get("author");

  if (!authorJSON) throw new Error("Author data is missing from the form data");
  const author = JSON.parse(authorJSON as string);

  const newComment = {
    feedbackId: params.feedbackId,
    content: content,
    user: author,
  };

  console.log("comment data", newComment);
  return null;
}
