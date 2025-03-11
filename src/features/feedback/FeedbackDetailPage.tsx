import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";
import CommentComposer from "../comments/CommentComposer";
import ActionBar from "../../ui/ActionBar";
import FeedbackDetailContent from "./FeedbackDetailContent";
import CommentSection from "../comments/CommentSection";
import { useMemo } from "react";

interface DetailPageProps {
  dataFromLoader: FeedbackType;
}

function FeedbackDetailPage({
  dataFromLoader,
}: DetailPageProps): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  /* TO DO: instead of checking for "dataFromLoader" in the component, throw an error in the loader to prevent rendering when data is missing */
  //if (!dataFromLoader) return <h1>Feedback Detail is not available.</h1>;

  const optimisticFeedback = location?.state;

  const feedback = optimisticFeedback
    ? { ...dataFromLoader, ...optimisticFeedback }
    : dataFromLoader;

  const { id, title, category, status, description, commentCount } = feedback;

  const editableFormData = useMemo(() => {
    return { title, category, status, description };
  }, [category, description, status, title]);

  return (
    <>
      <Outlet />
      <ActionBar>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        <br></br>
        <br></br>

        <Link
          to="editFeedback"
          state={{
            id,
            data: editableFormData,
          }}
          replace
        >
          Edit Feedback
        </Link>
      </ActionBar>
      <>
        <FeedbackDetailContent feedback={feedback}>
          <CommentSection>
            {commentCount > 0 ? (
              <CommentList commentCount={commentCount} feedbackId={id} />
            ) : (
              <p>No comments yet. Be the first to share your thoughts!</p>
            )}
            <CommentComposer
              mode="comment"
              payload={{ feedbackId: id, commentCount }}
            >
              <h2>Add a Comment</h2>
            </CommentComposer>
          </CommentSection>
        </FeedbackDetailContent>
      </>
    </>
  );
}

export default FeedbackDetailPage;
