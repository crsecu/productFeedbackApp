import { fetchFeedbackList, fetchFeedbackById } from "../services/apiFeedback";
import { LoaderFunctionArgs } from "react-router-dom";
import {
  FeedbackBoardLoaderData,
  FeedbackType,
  SuggestionType,
} from "../types/feedback.types";
import assert from "../utils/TS_helpers";
import { buildCommentHierarchy, fetchWrapper } from "../utils/helpers";
import { API_URL } from "../services/apiFeedback";

// Fetch list of feedback entries for Feedback Board Page
export async function feedbackBoardLoader(): Promise<FeedbackBoardLoaderData> {
  const data = await fetchFeedbackList("feedbackBoard");

  const { planned, "in-Progress": inProgress, live } = data;
  const suggestions = data.suggestion as SuggestionType[];

  const model: FeedbackBoardLoaderData = {
    suggestions,
    roadmapTotal: live.length + inProgress.length + planned.length,
    roadmapStatusCounts: {
      live: live.length,
      "in-Progress": inProgress.length,
      planned: planned.length,
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
export async function feedbackDetailLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const feedback: FeedbackType = await fetchFeedbackById(feedbackId);

  return feedback;
}

// Fetch Comment List for Detail Page
export async function commentDataLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");
  try {
    const comments = await fetchWrapper(
      `${API_URL}/comments?feedbackId=${feedbackId}`
    );

    const commentHierarchy = buildCommentHierarchy(comments);
    return { success: true, commentHierarchy, commentCount: comments.length };
  } catch (err) {
    return { success: false, error: err };
  }
}
