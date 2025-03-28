import { ActionFunctionArgs } from "react-router-dom";

import { editFeedback, submitFeedback } from "../services/apiFeedback";
import {
  createFeedbackActionResult,
  postCommentOrReply,
} from "../utils/helpers";
import {
  CategoryType,
  EditFeedbackFormValues,
  FeedbackActionResult,
  FeedbackFormErrors,
  NewFeedbackType,
  StatusType,
  SuggestionType,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";
import { SubmissionDataType } from "../types/comment.types";

/* Submit New Feedback Action*/
export async function createFeedbackAction({
  request,
}: ActionFunctionArgs): Promise<FeedbackActionResult<SuggestionType>> {
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
    return createFeedbackActionResult({
      actionType,
      outcome: "validationError",
      validationErrors,
    });
  }

  const response = await submitFeedback(feedback);

  // action submission failed
  if (!response.success)
    return createFeedbackActionResult({
      actionType,
      outcome: "failure",
      submitError: response.error,
    });

  // action submission successful
  return createFeedbackActionResult({
    actionType,
    outcome: "success",
    payload: response.payload,
  });
}

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* FeedbackDetailPage action - handles adding a comment/reply */
export async function submitCommentAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const intent = formData.get("intent") as "addComment";

  //TO DO: revisit types
  if (intent === "addComment") {
    const content = formData.get("content") as string;
    const submissionDataJSON = formData.get("submissionData") as string;
    const submissionData: SubmissionDataType = JSON.parse(submissionDataJSON);
    return await postCommentOrReply(content, submissionData, intent);
  }

  return null;
}

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* Submit Edit Feedback Action */
export async function editFeedbackAction({
  request,
  params,
}: ActionFunctionArgs): Promise<FeedbackActionResult<EditFeedbackFormValues>> {
  const actionType = "editFeedback";
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

  // action couldn't submit because of validation errors
  if (Object.keys(validationErrors).length > 0) {
    //return { success: null, actionType: "editFeedback", validationErrors };
    return createFeedbackActionResult<EditFeedbackFormValues>({
      actionType,
      outcome: "validationError",
      validationErrors,
    });
  }

  assert(feedbackId);

  const response = await editFeedback(feedbackId, data);

  // action submission failed
  if (!response.success)
    return createFeedbackActionResult<EditFeedbackFormValues>({
      actionType,
      outcome: "failure",
      submitError: response.error,
    });

  // action submission successful
  return createFeedbackActionResult<EditFeedbackFormValues>({
    actionType,
    outcome: "success",
    payload: response.payload,
  });
}
