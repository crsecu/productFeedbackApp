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
  /* access URL query parameters to check if the feedback entry has been edited */
  const searchParams = new URL(request.url).searchParams;
  const feedbackEditStatus = new URLSearchParams(searchParams).get("status");

  /* read state from Redux Store */
  const state = store.getState();

  /* 
   check if the feedback entry exists in Redux state 
   - this check is crucial because the Detail Page's current implementation relies on data from Redux state to render the UI
   - since Redux state gets reset on page reload, leading to data loss, having this check ensures a fallback API request is triggered to fetch the data 
  */
  const existingFeedback = state.feedback.feedbackList.find(
    (feedback) => feedback.id === params.feedbackId
  );

  /*
    if feedback entry is not available in Redux state or
    the feedback has been recently updated (indicated by the "status=edited" query parameter)
    fetch data from API, and return it 
    */
  if (feedbackEditStatus === "edited" || !existingFeedback) {
    const feedback: Feedback = await fetchFeedbackById(params.feedbackId);

    return feedback;
  }

  return null;
}
