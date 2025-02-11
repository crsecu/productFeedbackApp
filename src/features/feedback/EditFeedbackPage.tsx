import { useCallback } from "react";
import FeedbackFormNew from "./FeedbackFormNew";
import { FeedbackFormData, StatusType } from "../../types/feedback.types";
import { deleteFeedback } from "../../services/apiFeedback";
import { useActionData, useLocation, useNavigate } from "react-router-dom";

const statusUpdateOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];

function EditFeedbackPage(): React.JSX.Element {
  //debugger;
  const navigate = useNavigate();
  const { state } = useLocation();

  const formData = useActionData() as FeedbackFormData;

  console.log("edit errors", formData);

  // const handleDeleteFeedbackEntry = useCallback(async () => {
  //   await deleteFeedback(state.id);
  //   console.log("feedback entry deleted", state.id);

  //   //TO DO: Display message to inform user that the feedback entry was deleted

  //   navigate(-1);
  // }, [navigate, state.id]);

  return (
    <>
      <div className="editFeedback">
        <h1>Edit "{state?.title}"</h1>
        <FeedbackFormNew
          mode="edit"
          initialValues={state}
          statusOptions={statusUpdateOptions}
          errors={formData?.errors}
          // onDelete={() => handleDeleteFeedbackEntry()}
          onCancel={() =>
            navigate(`/feedbackDetail/${state.id}`, { replace: true })
          }
        />
      </div>
    </>
  );
}

export default EditFeedbackPage;
