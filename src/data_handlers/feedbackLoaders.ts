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
  const feedback: Feedback = await fetchFeedbackById(params.feedbackId);

  return feedback;
}
