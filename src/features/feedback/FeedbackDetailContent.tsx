import { useLoaderData, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import { memo, ReactNode } from "react";
import { CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "../comments/CommentComposer";

export interface CommentData {
  commentHierarchy: CommentThreadEntry[];
  commentCount: number;
}

interface FeedbackDetailContentProps {
  children: ReactNode;
}

function FeedbackDetailContent({
  children,
}: FeedbackDetailContentProps): React.JSX.Element {
  const params = useParams();
  const feedbackId = params.feedbackId as string;

  const commentData = useLoaderData() as CommentData;

  const countLoader = commentData.commentCount;

  const commentHierarchy = commentData.commentHierarchy;

  return (
    <main style={{ paddingTop: "26px" }}>
      {children}

      <CommentList commentCount={countLoader} comments={commentHierarchy} />
      <CommentComposer
        mode="comment"
        payload={{ feedbackId, commentCount: countLoader }}
      >
        <h2>Add a Comment</h2>
      </CommentComposer>
    </main>
  );
}

export default memo(FeedbackDetailContent);
