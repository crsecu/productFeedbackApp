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
export async function detailLoader({ request, params }: LoaderFunctionArgs) {
  /* access URL query parameters */
  const searchParams = new URL(request.url).searchParams;
  const status = new URLSearchParams(searchParams).get("status");
  console.log(status);

  /* read state from Redux Store */
  const state = store.getState();

  /* check if feedback entry exists in Redux state */
  const existingFeedback = state.feedback.feedbackList.find(
    (feedback) => feedback.id === params.feedbackId
  );

  /* - check if feedback entry is available in Redux state, and if "status" is null (null status indicates that the feedback entry hasn't been edited)
     - if condition is true, return existing feedback entry - this avoids unnecessary network request */
  if (existingFeedback && status === null) return existingFeedback;

  /* if feedback entry is not available in Redux state, fetch it from API, and return it */
  const feedback: Feedback = await fetchFeedbackById(params.feedbackId);

  return feedback;
}
