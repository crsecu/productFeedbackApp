/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ensureValidSession } from "../services/apiAuth";

//authGuardLoader
export async function authGuardLoader(): Promise<Response | string> {
  const authSession = await ensureValidSession();

  if (!authSession) return redirect("/login");

  return authSession.accessToken;
}

// Loader for Feedback Board Page
// returns grouped suggestions and roadmap-related feedback counts
export async function feedbackBoardLoader(): Promise<FeedbackBoardLoaderData | null> {
  const authSession = await ensureValidSession();
  if (!authSession) return null;

  const { accessToken, userId } = authSession;

  //data needed by FeedbackBoardPage
  const data = await fetchAndGroupFeedback(
    accessToken,
    userId,
    "feedbackBoard"
  );

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
  const authSession = await ensureValidSession();
  if (!authSession) return redirect("/");

  const { accessToken, userId } = authSession;

  const roadmapData = await fetchAndGroupFeedback(
    accessToken,
    userId,
    "developmentRoadmap"
  );

  return roadmapData;
}

// Fetch Feedback based on id
export async function feedbackDetailLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const authSession = await ensureValidSession();
  if (!authSession) return redirect("/");

  const { accessToken, userId } = authSession;

  const feedbackRaw = await fetchFeedbackById(accessToken, userId, feedbackId);

  // eslint-disable-next-line no-unused-vars
  const { upvotesByCurrentUser, ...newFeedback } = feedbackRaw;
  const upvoteCountCurrentUser = feedbackRaw.upvotesByCurrentUser[0].count ?? 0;

  return {
    ...newFeedback,
    upvotes: newFeedback.upvotes[0].count ?? 0,
    isUpvotedByCurrentUser: upvoteCountCurrentUser > 0,
  };
}

// Fetch Comment List for Detail Page
export async function commentDataLoader({ params }: LoaderFunctionArgs) {
  const feedbackId = params.feedbackId;
  assert(feedbackId, "feedbackId is invalid");

  const authSession = await ensureValidSession();
  if (!authSession) return redirect("/");

  const { accessToken } = authSession;

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
