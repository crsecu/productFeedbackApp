import {
  fetchAndGroupFeedback,
  fetchFeedbackById,
} from "../services/apiFeedback";
import { LoaderFunctionArgs } from "react-router-dom";
import assert from "../utils/TS_helpers";
import { buildCommentHierarchy, fetchWrapper } from "../utils/helpers";
import { API_URL } from "../services/apiFeedback";
import { CommentListType } from "../types/comment.types";
import { FeedbackBoardLoaderData } from "../types/loader.types";
import { RoadmapFeedbackGroupedByStatus } from "../types/roadmap.types";
import { Feedback } from "../types/feedback.types";

// Loader for Feedback Board Page
// returns grouped suggestions and roadmap-related feedback counts
export async function feedbackBoardLoader(): Promise<FeedbackBoardLoaderData> {
  const data = await fetchAndGroupFeedback("feedbackBoard");

  const { suggestion, planned, "in-Progress": inProgress, live } = data;

  const feedbackBoardData: FeedbackBoardLoaderData = {
    suggestions: suggestion,
    roadmapFeedbackCount: live.length + inProgress.length + planned.length,
    roadmapStatusCounts: {
      planned: planned.length,
      "in-Progress": inProgress.length,
      live: live.length,
    },
  };

  return feedbackBoardData;
}

// Loader for Roadmap Page
// returns grouped feedback (by status: planned, in-Progress, live)
export async function roadmapDevLoader(): Promise<RoadmapFeedbackGroupedByStatus> {
  const roadmapData = await fetchAndGroupFeedback("developmentRoadmap");

  return roadmapData;
}

// Fetch Feedback based on id
export async function feedbackDetailLoader({
  params,
}: LoaderFunctionArgs): Promise<Feedback> {
  //to do: type the return type
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  return await fetchFeedbackById(feedbackId);
}

// Fetch Comment List for Detail Page
export async function commentDataLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  try {
    const comments = await fetchWrapper<CommentListType>(
      `${API_URL}/comments?feedbackId=${feedbackId}`
    );

    const commentHierarchy = buildCommentHierarchy(comments);
    return { success: true, commentHierarchy, commentCount: comments.length };
  } catch (err) {
    return { success: false, error: err };
  }
}
