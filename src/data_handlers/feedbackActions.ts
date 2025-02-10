import { ActionFunctionArgs, redirect } from "react-router-dom";
import { submitFeedback, editFeedback } from "../services/apiFeedback";
import assert from "../utils/TS_helpers";
import { editFeedbackEntry, postCommentOrReply } from "../utils/helpers";
import { FeedbackFormErrors } from "../types/feedback.types";

/* Submit New Feedback Action*/
export async function createFeedbackAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    title: string;
    category: string;
    description: string;
  };

  const feedback = {
    ...data,
    category: data.category.toLowerCase(),
    status: "suggestion",
    upvotes: 0,
    commentCount: 0,
  };

  /* Form error handling */
  const errors: FeedbackFormErrors = {};
  if (feedback.title.trim() === "") errors.title = "Please enter a valid title";
  if (feedback.description.trim() === "")
    errors.description = "Please enter a valid description";

  if (Object.keys(errors).length > 0) return errors;

  const newFeedback = await submitFeedback(feedback);

  return redirect(`/feedbackBoard?newFeedbackId=${newFeedback.id}`);
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

  if (formType === "editFeedback") {
    const response = await editFeedbackEntry(formData, feedbackId);
    return response;
  }

  if (formType === "submitCommentOrReply") {
    return postCommentOrReply(formData, feedbackId);
  }
}
