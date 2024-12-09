import { fetchAllFeedback } from "../services/apiFeedback";
import { fetchFeedbackById } from "../services/apiFeedback";

import { LoaderFunctionArgs } from "react-router-dom";
import { Feedback } from "../features/feedback/feedback.types";

// Fetch list of feedback entries from API
export async function feedbackLoader() {
  const feedbackData: Feedback[] = await fetchAllFeedback();

  return feedbackData;
}

// Fetch Feedback based on id
export async function detailLoader({ params }: LoaderFunctionArgs) {
  /* access URL query parameters to check if the feedback entry has been edited */
  //const searchParams = new URL(request.url).searchParams;
  //const feedbackEditStatus = new URLSearchParams(searchParams).get("status");

  const feedback: Feedback = await fetchFeedbackById(params.feedbackId);
  return feedback;
}
