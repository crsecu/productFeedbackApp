import { ActionFunctionArgs, ActionFunction, redirect } from "react-router-dom";

import { editFeedback, submitFeedback } from "../services/apiFeedback";
import {
  createFeedbackActionResult,
  postCommentOrReply,
} from "../utils/helpers";
import {
  CategoryType,
  FeedbackFormErrors,
  NewFeedbackType,
  StatusType,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";

/* Submit New Feedback Action*/
export const createFeedbackAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const actionType = "createFeedback";

  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    title: string;
    category: CategoryType;
    description: string;
  };

  const category = data.category.toLowerCase() as CategoryType;

  const feedback: NewFeedbackType = {
    ...data,
    category,
    status: "suggestion",
    upvotes: 0,
    commentCount: 0,
  };

  /* Form Validation Error Handling */
  const validationErrors: FeedbackFormErrors = {};

  if (feedback.title.trim() === "")
    validationErrors.title = "Please enter a valid title";
  if (feedback.description.trim() === "")
    validationErrors.description = "Please enter a valid description";

  // action couldn't submit because of validation errors
  if (Object.keys(validationErrors).length > 0) {
    //return { success: null, actionType: "createFeedback", validationErrors };
    return createFeedbackActionResult({ actionType, validationErrors });
  }

  const response = await submitFeedback(feedback);

  // action submission failed
  if (!response.success)
    return createFeedbackActionResult({
      actionType,
      success: false,
      //TO DO: pass message: response.error after defining the types of errors returned when fetch fails
    });

  // action submission successful
  return createFeedbackActionResult({
    actionType,
    success: true,
    payload: response.payload,
  });
};

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
    category: CategoryType;
    status: StatusType;
  };

  //Form Error Handling
  const validationErrors: FeedbackFormErrors = {};
  if (data.title.trim() === "")
    validationErrors.title = "Please enter a valid title";
  if (data.description.trim() === "")
    validationErrors.description = "Please enter a valid description";

  if (Object.keys(validationErrors).length > 0) return { validationErrors };

  assert(feedbackId);

  await editFeedback(feedbackId, data);
  return redirect(`/feedbackDetail/${feedbackId}?status=edited`);
}
