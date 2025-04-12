import { useLoaderData, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import { memo, ReactNode } from "react";

import CommentComposer from "../comments/CommentComposer";
import { CommentData } from "./FeedbackDetailPage";

interface FeedbackDetailContentProps {
  children?: ReactNode;
}

function FeedbackDetailContent({
  children,
}: FeedbackDetailContentProps): React.JSX.Element {
  const params = useParams();
  const feedbackId = params.feedbackId as string;
  console.log("yu");
  const commentData = useLoaderData() as CommentData;

  const countLoader = commentData.commentCount;

  const commentHierarchy = commentData.commentHierarchy;

  return (
    <main style={{ paddingTop: "26px" }}>
      {children}
      {!commentData.success ? (
        <p className="error">OOPS.Failed to load comments.</p>
      ) : (
        <>
          <CommentList commentCount={countLoader} comments={commentHierarchy} />

          <CommentComposer
            mode="comment"
            payload={{ feedbackId, commentCount: countLoader }}
          >
            <h2>Add a Comment</h2>
          </CommentComposer>
        </>
      )}
    </main>
  );
}

export default memo(FeedbackDetailContent);
