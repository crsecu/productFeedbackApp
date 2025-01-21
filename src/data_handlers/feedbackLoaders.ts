import { fetchFeedbackList, fetchFeedbackById } from "../services/apiFeedback";
import { LoaderFunctionArgs } from "react-router-dom";
import { FeedbackType } from "../types/feedback.types";
import assert from "../utils/TS_helpers";

// Fetch list of feedback entries for Feedback Board Page
export async function feedbackBoardLoader() {
  const data = await fetchFeedbackList("feedbackBoard");

  return data;
}

// Fetch list of feedback entries for Roadmap Development Page (status: planned, in-progress, live)
export async function roadmapDevLoader() {
  const data = await fetchFeedbackList("developmentRoadmap");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { suggestion, ...roadmapFeedbackList } = data;

  return roadmapFeedbackList;
}

// Fetch Feedback based on id
export async function detailLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const feedback: FeedbackType = await fetchFeedbackById(feedbackId);

  return feedback;
}
