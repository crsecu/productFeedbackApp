import FeedbackForm from "./FeedbackForm";
import { FeedbackType } from "../../types/feedback.types";

interface EditFeedbackPageProps {
  state: FeedbackType;
}
function EditFeedbackPage({ state }: EditFeedbackPageProps): React.JSX.Element {
  return (
    <>
      <div className="editFeedback">
        <h1>Edit "{state.title}"</h1>
        <FeedbackForm httpMethod="PATCH" mode="edit" feedbackEntryData={state}>
          {/* <button type="button" onClick={() => handleDeleteFeedbackEntry()}>
            Delete
          </button> */}
        </FeedbackForm>
      </div>
    </>
  );
}

export default EditFeedbackPage;
