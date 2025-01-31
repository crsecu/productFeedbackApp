import { useCallback, useMemo, useState } from "react";
import FeedbackFormNew from "./FeedbackFormNew";
import { FeedbackType, StatusType } from "../../types/feedback.types";
import { deleteFeedback } from "../../services/apiFeedback";
import { useNavigate } from "react-router-dom";

interface EditFeedbackPageProps {
  state: FeedbackType;
}

const statusUpdateOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];

function EditFeedbackPage({ state }: EditFeedbackPageProps): React.JSX.Element {
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);

  const initialValues = useMemo(() => {
    const { id, title, category, status, description } = state;

    return { id, title, category, status, description };
  }, [state]);

  const handleDeleteFeedbackEntry = useCallback(async () => {
    await deleteFeedback(state.id);
    console.log("feedback entry deleted", state.id);

    //TO DO: Display message to inform user that the feedback entry was deleted

    navigate(-1);
  }, [navigate, state.id]);

  return (
    <>
      {!showEditForm && (
        <button onClick={() => setShowEditForm(true)}>Edit Feedback</button>
      )}

      {showEditForm && (
        <div className="editFeedback">
          <h1>Edit "{state.title}"</h1>
          <FeedbackFormNew
            mode="edit"
            initialValues={initialValues}
            statusOptions={statusUpdateOptions}
            onDelete={handleDeleteFeedbackEntry}
            onCancel={() => setShowEditForm(false)}
          />
        </div>
      )}
    </>
  );
}

export default EditFeedbackPage;
