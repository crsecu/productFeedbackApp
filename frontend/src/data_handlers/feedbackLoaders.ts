import {
  fetchAndGroupFeedback,
  fetchFeedbackById,
  HEADERS,
} from "../services/apiFeedback";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import assert from "../utils/TS_helpers";
import { buildCommentHierarchy, fetchWrapper } from "../utils/helpers";
import { API_URL } from "../services/apiFeedback";
import { CommentListType } from "../types/comment.types";
import { FeedbackBoardLoaderData } from "../types/loader.types";
import { RoadmapFeedbackGroupedByStatus } from "../types/roadmap.types";
import { Feedback } from "../types/feedback.types";
import { ensureValidSession } from "../services/apiAuth";
//Homepage loader
export async function rootLoader(): Promise<boolean> {
  const accessToken = await ensureValidSession();
  console.log("root LOADER", accessToken);

  return !!accessToken;
}

// Loader for Feedback Board Page
// returns grouped suggestions and roadmap-related feedback counts
export async function feedbackBoardLoader(): Promise<FeedbackBoardLoaderData | null> {
  const accessToken = await ensureValidSession();
  if (!accessToken) return null;

  //data needed by FeedbackBoardPage
  const data = await fetchAndGroupFeedback(accessToken, "feedbackBoard");

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
export async function roadmapDevLoader(): Promise<
  Response | RoadmapFeedbackGroupedByStatus
> {
  const accessToken = await ensureValidSession();
  if (!accessToken) return redirect("/");

  const roadmapData = await fetchAndGroupFeedback(
    accessToken,
    "developmentRoadmap"
  );

  return roadmapData;
}

// Fetch Feedback based on id
export async function feedbackDetailLoader({
  params,
}: LoaderFunctionArgs): Promise<Feedback | Response> {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const accessToken = await ensureValidSession();
  if (!accessToken) return redirect("/");

  return await fetchFeedbackById(accessToken, feedbackId);
}

// Fetch Comment List for Detail Page
export async function commentDataLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const accessToken = await ensureValidSession();
  if (!accessToken) return redirect("/");

  try {
    const comments = await fetchWrapper<CommentListType>(
      `${API_URL}/comments?feedbackId=eq.${feedbackId}`,
      {
        headers: { ...HEADERS.read, Authorization: `Bearer ${accessToken}` },
      }
    );

    const commentHierarchy = buildCommentHierarchy(comments);
    return { success: true, commentHierarchy, commentCount: comments.length };
  } catch (err) {
    return { success: false, error: err };
  }
}
