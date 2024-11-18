import { fetchFeedbackData } from "../services/apiFeedback";

export async function feedbackLoader() {
  const feedbackData = await fetchFeedbackData();
  return feedbackData;
}
