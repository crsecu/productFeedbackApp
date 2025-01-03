import { ActionFunctionArgs, redirect } from "react-router-dom";
import { submitFeedback, editFeedback } from "../services/apiFeedback";
import assert from "../utils/TS_helpers";
import { editFeedbackEntry, postCommentOrReply } from "../utils/helpers";

/* Submit New Feedback Action*/
export async function createFeedbackAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    title: string;
    description: string;
    category: string;
  };

  const feedback = {
    ...data,
    category: data.category.toLowerCase(),
    status: "suggestion",
    upvotes: 0,
    commentCount: 0,
  };

  /* TO DO: Form error handling */
  //const errors = {};

  const newFeedback = await submitFeedback(feedback);

  console.log("submitted feedback", newFeedback);

  return redirect(`/feedbackDetail/${newFeedback.id}`);
}

/* Edit Feedback Action*/
export async function editFeedbackAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData) as {
    title: string;
    description: string;
    category: string;
    status: string;
  };

  assert(params.feedbackId);
  console.log("edit???");
  await editFeedback(params.feedbackId, data);

  return null;
}

/* 
 FeedbackDetailPage action - handles actions such as editing a feedback entry or adding a comment/reply; determines the action type 
 based on the formType and updates the backend accordingly.
*/
export async function submitDetailAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();
  const formType = formData.get("formType");
  console.log("formData inside comment action", formType);

  if (formType === "editFeedback") {
    return editFeedbackEntry(formData, feedbackId);
  }

  if (formType === "submitCommentOrReply") {
    return postCommentOrReply(formData, feedbackId);
  }
}
