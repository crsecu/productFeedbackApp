import { ActionFunctionArgs, ActionFunction } from "react-router-dom";

import { editFeedback, submitFeedback } from "../services/apiFeedback";
import {
  createFeedbackActionResult,
  postCommentOrReply,
} from "../utils/helpers";
import {
  CategoryType,
  FeedbackFormErrors,
  NewFeedbackType,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";
import { SubmissionDataType } from "../types/comment.types";

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

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* FeedbackDetailPage action - handles adding a comment/reply */
export async function submitCommentAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const intent = formData.get("intent") as "addComment";

  console.log("ACTION COMMENT", intent);

  //TO DO: revisit types after cleaning up CommentComposer formData

  if (intent === "addComment") {
    const content = formData.get("content") as string;
    const submissionDataJSON = formData.get("submissionData") as string;
    const submissionData: SubmissionDataType = JSON.parse(submissionDataJSON);
    return postCommentOrReply(content, submissionData);
  }
  return null;
}

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* Submit Edit Feedback Action */
export async function editFeedbackAction({
  request,
  params,
}: ActionFunctionArgs) {
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();

  const formEntries = Object.fromEntries(formData);
  const { intent, ...submissionData } = formEntries as Record<string, string>;
  const actionType = intent as "editFeedback";

  //Form Error Handling
  const validationErrors: FeedbackFormErrors = {};
  if (submissionData.title.trim() === "")
    validationErrors.title = "Please enter a valid title";
  if (submissionData.description.trim() === "")
    validationErrors.description = "Please enter a valid description";

  // action couldn't submit because of validation errors
  if (Object.keys(validationErrors).length > 0) {
    //return { success: null, actionType: "editFeedback", validationErrors };
    return createFeedbackActionResult({ actionType, validationErrors });
  }

  assert(feedbackId);

  const response = await editFeedback(feedbackId, submissionData);

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
}
