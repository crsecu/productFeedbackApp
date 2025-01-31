import { useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackFormNew from "./FeedbackFormNew";
import { useCallback } from "react";

function CreateFeedbackPage(): React.JSX.Element {
  const navigate = useNavigate();

  const cancelCreateFeedback = useCallback(() => {
    console.log("CANCELING CREATE FEEDBACK FORM");
    navigate(-1); //TO DO: Keep in mind that this doesn't replace current entry in history stack, therefore, pressing "forward" button takes you back to form - address this later
  }, [navigate]);

  return (
    <>
      <ActionBar>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </ActionBar>
      <main className="createFeedback_new">
        <h1>Create New Feedback</h1>
        <p>
          All fields are required to create feedback. Please complete the form
          before submitting.
        </p>
        <FeedbackFormNew onCancel={cancelCreateFeedback} />
      </main>
    </>
  );
}

export default CreateFeedbackPage;
