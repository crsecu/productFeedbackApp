import { useCallback, useState } from "react";
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
  const navigate = useNavigate();
  const { state } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialFormValues, setInitialFormValues] = useState(state);

  const formData = useActionData() as FeedbackFormData;

  const handleDeleteFeedbackEntry = useCallback(async () => {
    await deleteFeedback(initialFormValues.id);
    console.log("feedback entry deleted", initialFormValues.id);

    //TO DO: Display message to inform user that the feedback entry was deleted
    navigate(-1);
  }, [navigate, initialFormValues.id]);

  return (
    <>
      <div className="editFeedback">
        <h1>Edit "{initialFormValues.title}"</h1>

        <FeedbackFormNew
          mode="edit"
          initialValues={initialFormValues}
          statusOptions={statusUpdateOptions}
          errors={formData?.errors}
          onDelete={() => handleDeleteFeedbackEntry()}
          onCancel={() =>
            navigate(`/feedbackDetail/${initialFormValues.id}`, {
              replace: true,
            })
          }
        />
      </div>
    </>
  );
}

export default EditFeedbackPage;
