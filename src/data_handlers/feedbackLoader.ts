import { fetchAllFeedback } from "../services/apiFeedback";
import { fetchFeedbackById } from "../services/apiFeedback";
import { setFeedbackData } from "../features/feedback/feedbackSlice";
import store from "../store";
import { LoaderFunctionArgs } from "react-router-dom";
import { Feedback } from "../features/feedback/feedback.types";

// Fetch list of feedback entries from API and store returned data in state
export async function feedbackLoader() {
  const feedbackData: Feedback[] = await fetchAllFeedback();
  console.log("Feedback entries", feedbackData);
  if (feedbackData) store.dispatch(setFeedbackData(feedbackData));

  return feedbackData;
}

// Fetch Feedback based on id
export async function detailLoader({ params }: LoaderFunctionArgs) {
  const state = store.getState();

  // check if feedback entry exists in Redux state
  const existingFeedback = state.feedback.feedbackList.find(
    (feedback) => feedback.id === params.feedbackId
  );

  //if feedback entry is available in Redux state, return it to avoid unnecessary network request
  if (existingFeedback) return existingFeedback;

  //if feedback entry is not available in Redux state, fetch it from API, and return it
  const feedback: Feedback = await fetchFeedbackById(params.feedbackId);

  return feedback;
}
