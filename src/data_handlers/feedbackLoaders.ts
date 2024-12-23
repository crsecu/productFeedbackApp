import { fetchFeedbackList } from "../services/apiFeedback";
import { fetchFeedbackById } from "../services/apiFeedback";

import { LoaderFunctionArgs } from "react-router-dom";
import { FeedbackType } from "../types/feedback.types";

// Fetch list of feedback entries from API
export async function feedbackLoader() {
  const feedbackData: FeedbackType[] = await fetchFeedbackList();

  return feedbackData;
}

// Fetch Feedback based on id
export async function detailLoader({ params }: LoaderFunctionArgs) {
  const feedback: FeedbackType = await fetchFeedbackById(params.feedbackId);

  return feedback;
}
