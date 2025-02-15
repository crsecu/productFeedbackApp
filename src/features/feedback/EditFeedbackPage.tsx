import { useState } from "react";
import FeedbackFormNew from "./FeedbackFormNew";
import { FeedbackFormData, StatusType } from "../../types/feedback.types";
import { useActionData, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../types/hooks";
import { showModal } from "../../store/slices/modalSlice";

const statusUpdateOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];

function EditFeedbackPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFeedbackValues, setCurrentFeedbackValues] = useState(state);

  const formData = useActionData() as FeedbackFormData;

  // const handleDeleteFeedbackEntry = useCallback(async () => {
  //   await deleteFeedback(initialFormValues.id);
  //   console.log("feedback entry deleted", initialFormValues.id);

  //   //TO DO: Display message to inform user that the feedback entry was deleted
  //   navigate(-1);
  // }, [navigate, initialFormValues.id]);

  return (
    <>
      <div className="editFeedback">
        <h1>Edit "{currentFeedbackValues.feedbackData.title}"</h1>

        <FeedbackFormNew
          mode="edit"
          initialValues={currentFeedbackValues}
          statusOptions={statusUpdateOptions}
          errors={formData?.errors}
          onDelete={() =>
            dispatch(
              showModal({
                modalType: "DELETE_FEEDBACK",
                confirmPayload: currentFeedbackValues.feedbackData.id,
              })
            )
          }
          onCancel={() =>
            navigate(
              `/feedbackDetail/${currentFeedbackValues.feedbackData.id}`,
              {
                replace: true,
              }
            )
          }
        />
      </div>
    </>
  );
}

export default EditFeedbackPage;
