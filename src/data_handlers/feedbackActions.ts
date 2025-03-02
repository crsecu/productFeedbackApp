import { ActionFunctionArgs, json, redirect } from "react-router-dom";

import { editFeedback, submitFeedback } from "../services/apiFeedback";
import { postCommentOrReply } from "../utils/helpers";
import {
  CategoryType,
  FeedbackFormErrors,
  NewFeedbackType,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";

/* Submit New Feedback Action*/
export async function createFeedbackAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data1 = Object.fromEntries(formData) as {
    title: string;
    category: CategoryType;
    description: string;
  };

  const category = data1.category.toLowerCase() as CategoryType;

  const feedback: NewFeedbackType = {
    ...data1,
    category,
    status: "suggestion",
    upvotes: 0,
    commentCount: 0,
  };

  /* Form error handling */
  const validationErrors: FeedbackFormErrors = {};
  if (feedback.title.trim() === "")
    validationErrors.title = "Please enter a valid title";
  if (feedback.description.trim() === "")
    validationErrors.description = "Please enter a valid description";

  if (Object.keys(validationErrors).length > 0) {
    return { success: false, validationErrors };
  }

  const submissionResult = await submitFeedback(feedback);

  return submissionResult;
}

/* 
 FeedbackDetailPage action - handles adding a comment/reply; 
*/
export async function submitCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();

  return postCommentOrReply(formData, feedbackId);
}

export async function editFeedbackAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();

  const data = Object.fromEntries(formData) as {
    title: string;
    description: string;
    category: string;
    status: string;
  };

  //Form Error Handling
  const errors: FeedbackFormErrors = {};
  if (data.title.trim() === "") errors.title = "Please enter a valid title";
  if (data.description.trim() === "")
    errors.description = "Please enter a valid description";

  if (Object.keys(errors).length > 0) return { errors };

  assert(feedbackId);

  await editFeedback(feedbackId, data);
  return redirect(`/feedbackDetail/${feedbackId}?status=edited`);
}
