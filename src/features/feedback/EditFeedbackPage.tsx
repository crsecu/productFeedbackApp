import { useLocation, useNavigate } from "react-router-dom";
import { deleteFeedback } from "../../services/apiFeedback";
import FeedbackForm from "./FeedbackForm";

function EditFeedbackPage(): React.JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();

  async function handleDeleteFeedbackEntry() {
    await deleteFeedback(state.id);
    console.log("feedback entry deleted", state.id);

    navigate("/feedbackBoard");

    //TO DO: Display message to inform user that the feedback entry was deleted
  }

  return (
    <div className="editFeedback">
      <h1>Edit "{state.title}"</h1>
      <FeedbackForm httpMethod="PATCH" mode="edit" feedbackEntryData={state}>
        <button type="button" onClick={() => handleDeleteFeedbackEntry()}>
          Delete
        </button>
      </FeedbackForm>
    </div>
  );
}

export default EditFeedbackPage;
