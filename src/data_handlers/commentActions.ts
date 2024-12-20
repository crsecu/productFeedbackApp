import { ActionFunctionArgs } from "react-router-dom";
import { submitComment, submitReply } from "../services/apiComment";
import {
  CommentAuthor,
  NewComment,
  RootCommentDataType,
} from "../features/feedback/feedback.types";
import { updateCommentCount } from "../services/apiFeedback";

//Submit New Comment Action
export async function submitCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const {
    content,
    currentCommentCount: commentCount,
    author: authorJSON,
    rootComment: rootCommentJSON,
    mode,
  } = data;

  const currentCommentCount: number = JSON.parse(commentCount as string);
  const author: CommentAuthor = JSON.parse(authorJSON as string);

  if (mode === "comment") {
    const newComment: NewComment = {
      parentId: null,
      feedbackId,
      content: content as string,
      user: author,
      replies: [],
    };

    await submitComment(newComment);
  }

  if (mode === "reply") {
    const rootComment: RootCommentDataType = JSON.parse(
      rootCommentJSON as string
    );

    const replyId = Date.now(); //TO DO: look into better ways to generate new ids
    const parentType = rootComment.parentId ? "reply" : "comment";
    const rootCommentId = rootComment.parentId ?? rootComment.id;

    const newReply = {
      content: content as string,
      id: `r_${replyId}`,
      rootCommentId,
      parentId: rootComment.id,
      parentType: parentType,
      replyingTo: rootComment.authorUsername,
      replies: [],
      user: author,
    };

    console.log(newReply);
    await submitReply(rootCommentId, newReply);
  }

  await updateCommentCount(feedbackId, currentCommentCount + 1);

  return null;
}
