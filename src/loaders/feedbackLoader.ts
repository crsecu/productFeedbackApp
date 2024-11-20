import { fetchFeedbackData } from "../services/apiFeedback";
import { setFeedbackData } from "../features/feedback/feedbackSlice";
import store from "../store";

export async function feedbackLoader() {
  const feedbackData = await fetchFeedbackData();
  console.log("test", feedbackData);
  if (feedbackData) store.dispatch(setFeedbackData(feedbackData));

  return feedbackData;
}
