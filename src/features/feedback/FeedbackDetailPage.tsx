import { useLoaderData, useParams } from "react-router-dom";
import { CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "../comments/CommentComposer";
import CommentList from "../comments/CommentList";

export interface CommentData {
  success: boolean;
  err?: string;
  commentHierarchy: CommentThreadEntry[];
  commentCount: number;
}

function FeedbackDetailPage(): React.JSX.Element {
  const params = useParams();
  const feedbackId = params.feedbackId as string;

  console.log("FeedbackDetailPage");
  const commentData = useLoaderData() as CommentData;

  const countLoader = commentData.commentCount;

  const commentHierarchy = commentData.commentHierarchy;

  return (
    <main style={{ paddingTop: "26px" }}>
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

export default FeedbackDetailPage;

//

//

//

/* TO DO: instead of checking for "dataFromLoader" in the component, throw an error in the loader to prevent rendering when data is missing */
//if (!dataFromLoader) return <h1>Feedback Detail is not available.</h1>;
