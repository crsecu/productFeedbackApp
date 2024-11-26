import { fetchAllFeedback } from "../services/apiFeedback";
import { setFeedbackData } from "../features/feedback/feedbackSlice";
import store from "../store";

// Fetch list of Feedbacks from API and store returned data in state
export async function feedbackLoader() {
  const feedbackData = await fetchAllFeedback();
  console.log("test", feedbackData);
  if (feedbackData) store.dispatch(setFeedbackData(feedbackData));

  return feedbackData;
}
