import { useLoaderData, useParams } from "react-router-dom";
import { CommentData } from "../../types/comment.types";
import CommentComposer from "../comments/CommentComposer";
import CommentList from "../comments/CommentList";

function FeedbackDetailCommentThread(): React.JSX.Element {
  const params = useParams();
  const feedbackId = params.feedbackId as string;

  const commentData = useLoaderData() as CommentData;

  const countLoader = commentData.commentCount;

  const commentHierarchy = commentData.commentHierarchy;

  return (
    <main>
      {!commentData.success ? (
        <p>OOPS.Failed to load comments.</p>
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

export default FeedbackDetailCommentThread;

//

//

//

/* TO DO: instead of checking for "dataFromLoader" in the component, throw an error in the loader to prevent rendering when data is missing */
//if (!dataFromLoader) return <h1>Feedback Detail is not available.</h1>;
