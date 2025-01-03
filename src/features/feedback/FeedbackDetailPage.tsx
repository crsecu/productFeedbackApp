import { useLoaderData, useNavigate } from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";
import FeedbackItem from "./FeedbackItem";
import CommentComposer from "../comments/CommentComposer";
import ActionBar from "../../ui/ActionBar";
import { useState } from "react";
import EditFeedbackPage from "./EditFeedbackPage";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const feedback = loaderData as FeedbackType;

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;
  const commentCount = feedback.commentCount ?? 0;

  function handleEditModal() {
    console.log("click modal");
    setIsModalOpen(true);
  }

  function handleCancel() {
    console.log("canceling edit of feedback entry");
    setIsModalOpen(false);
  }
  return (
    <>
      <ActionBar>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <br></br>
        <br></br>
        <button onClick={handleEditModal}>Edit Feedback</button>
      </ActionBar>

      <main>
        {isModalOpen && (
          <div>
            <EditFeedbackPage state={feedback} />
            <button type="button" onClick={() => handleCancel()}>
              Cancel X
            </button>
          </div>
        )}
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
      </main>
    </>
  );
}

export default FeedbackDetailPage;
