import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";
import CommentComposer from "../comments/CommentComposer";
import ActionBar from "../../ui/ActionBar";
import FeedbackDetailContent from "./FeedbackDetailContent";
import CommentSection from "../comments/CommentSection";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isEditFeedback = pathname.includes("editFeedback");

  const feedback = loaderData as FeedbackType;

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;
  const { id, title, category, status, description } = feedback;

  const isFeedbackEntryNew =
    searchParams.get("status") === "new" ? true : false;

  const commentCount = feedback.commentCount ?? 0;
  return (
    <>
      <ActionBar>
        <button
          onClick={() => {
            return isEditFeedback
              ? navigate(`/feedbackDetail/${id}`, { replace: true })
              : navigate(-1);
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
            data: { title, category, status, description },
          }}
          replace
        >
          Edit Feedback
        </Link>
      </ActionBar>
      {isEditFeedback ? (
        <Outlet />
      ) : (
        <>
          <FeedbackDetailContent feedback={feedback}>
            <CommentSection>
              {!isFeedbackEntryNew && commentCount > 0 && (
                <CommentList
                  commentCount={commentCount}
                  feedbackId={feedback.id}
                />
              )}

              <CommentComposer commentCount={commentCount}>
                <h2>Add a Comment</h2>
              </CommentComposer>
            </CommentSection>
          </FeedbackDetailContent>
        </>
      )}
    </>
  );
}

export default FeedbackDetailPage;
