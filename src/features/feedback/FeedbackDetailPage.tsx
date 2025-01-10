import { useLoaderData, useNavigate } from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";
import FeedbackItem from "./FeedbackItem";
import CommentComposer from "../comments/CommentComposer";
import ActionBar from "../../ui/ActionBar";
// import EditFeedbackPage from "./EditFeedbackPage";
import ModalWrapper from "../../ui/ModalWrapper";
import FeedbackForm from "./FeedbackForm";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const feedback = loaderData as FeedbackType;

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;
  const commentCount = feedback.commentCount ?? 0;

  return (
    <>
      <ActionBar>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <br></br>
        <br></br>
      </ActionBar>

      <main>
        <ModalWrapper>
          <FeedbackForm
            httpMethod="PATCH"
            mode="edit"
            feedbackEntryData={feedback}
          ></FeedbackForm>
        </ModalWrapper>
        <>
          <br></br>
          <br></br>
          <FeedbackItem feedbackItem={feedback} isDetailPage={true} />
          <section>
            <CommentList commentCount={commentCount} feedbackId={feedback.id} />
          </section>
          <section>
            <h2>Add a Comment</h2>
            <CommentComposer commentCount={commentCount} />
          </section>
        </>
      </main>
    </>
  );
}

export default FeedbackDetailPage;
