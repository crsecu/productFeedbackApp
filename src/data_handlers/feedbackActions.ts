import { ActionFunctionArgs, redirect } from "react-router-dom";
import { submitFeedback, editFeedback } from "../services/apiFeedback";
import assert from "../utils/TS_helpers";

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
    status: "suggestion",
    upvotes: 0,
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

  await editFeedback(params.feedbackId, data);

  return redirect(`/feedbackDetail/${params.feedbackId}?status=edited`);
}
