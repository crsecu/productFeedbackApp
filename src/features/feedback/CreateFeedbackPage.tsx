import { useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackForm from "./FeedbackForm";

function CreateFeedbackPage(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <ActionBar>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </ActionBar>
      <div className="createFeedback_new">
        <h1>Create New Feedback</h1>
        <p>
          All fields are required to create feedback. Please complete the form
          before submitting.
        </p>
        <FeedbackForm httpMethod="POST" mode="create" />
      </div>
    </>
  );
}

export default CreateFeedbackPage;
