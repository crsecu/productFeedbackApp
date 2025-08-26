import { ActionFunctionArgs } from "react-router-dom";

import { editFeedback, submitFeedback } from "../services/apiFeedback";
import {
  performActionSubmission,
  handleValidationErrors,
  postCommentOrReply,
} from "../utils/helpers";
import {
  Category,
  NewFeedback,
  Status,
  SuggestionFeedback,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";
import { SubmissionDataType } from "../types/comment.types";
import { ActionResult } from "../types/action.types";
import {
  CreateFeedbackFormValues,
  EditFeedbackFormValues,
} from "../types/form.types";
import { ensureValidSession } from "../services/apiAuth";

/* Submit New Feedback Action*/
export async function createFeedbackAction({
  request,
}: ActionFunctionArgs): Promise<
  ActionResult | ActionResult<SuggestionFeedback> | null
> {
  const accessToken = await ensureValidSession();
  if (!accessToken) return null;

  const actionType = "createFeedback";

  //Extract and parse form data from the request
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    title: string;
    category: Category;
    description: string;
  };

  //Validate form input and ensure required fields are not whitespace-only (HTML "required" handles empty)
  const validationErrors = handleValidationErrors<CreateFeedbackFormValues>(
    actionType,
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  const newFeedback: NewFeedback = {
    ...formValues,
    status: "suggestion",
    upvotes: 0,
  };

  //Submit new feedback and return a standardized result: success(if submission succeeds), or failure (if it fails)
  const result = await performActionSubmission<SuggestionFeedback>(
    actionType,
    () => submitFeedback(accessToken, newFeedback)
  );

  return result;
}

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* Submit Edit Feedback Action */
export async function editFeedbackAction({
  request,
  params,
}: ActionFunctionArgs): Promise<
  ActionResult | ActionResult<EditFeedbackFormValues> | null
> {
  const accessToken = await ensureValidSession();
  if (!accessToken) return null;

  const actionType = "editFeedback";
  const feedbackId = params.feedbackId as string;
  const formData = await request.formData();

  const formValues = Object.fromEntries(formData) as {
    title: string;
    description: string;
    category: Category;
    status: Status;
  };

  //Validate form input and ensure required fields are not whitespace-only (HTML "required" handles empty)
  const validationErrors = handleValidationErrors<EditFeedbackFormValues>(
    actionType,
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //Closure function that captures feedbackId and passes it to editFeedback func
  assert(feedbackId);

  //Submit edited feedback and return a standardized result: success(if submission succeeds), or failure (if it fails)
  const result = await performActionSubmission<EditFeedbackFormValues>(
    actionType,
    () => editFeedback(accessToken, feedbackId, formValues)
  );

  return result;
}

/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
/* FeedbackDetailPage action - handles adding a comment/reply */
export async function submitCommentAction({ request }: ActionFunctionArgs) {
  const accessToken = await ensureValidSession();
  if (!accessToken) return null;

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
