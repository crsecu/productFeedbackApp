import { fetchFeedbackList, fetchFeedbackById } from "../services/apiFeedback";
import { LoaderFunctionArgs } from "react-router-dom";
import { FeedbackType } from "../types/feedback.types";
import assert from "../utils/TS_helpers";

// Fetch list of feedback entries for Feedback Board Page
export async function feedbackBoardLoader() {
  const data = await fetchFeedbackList("feedbackBoard");

  const model = {
    suggestions: data.suggestion,
    roadmap: {
      live: data.live.length,
      "in-Progress": data["in-Progress"].length,
      planned: data.planned.length,
    },
  };

  return model;
}

// Fetch list of feedback entries for Roadmap Development Page (status: planned, in-Progress, live)
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
  console.log("is the detail loader triggered");
  return feedback;
}
