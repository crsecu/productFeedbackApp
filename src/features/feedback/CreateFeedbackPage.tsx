import { useRef } from "react";
import {
  Link,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackFormNew from "./FeedbackFormNew";
import { FeedbackFormData } from "../../types/feedback.types";

function CreateFeedbackPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { state } = useLocation();

  const formData = useActionData() as FeedbackFormData;

  const prevPage = useRef(state?.from);

  return (
    <div
      style={{ backgroundColor: "orange", padding: "10px", marginTop: "20px" }}
    >
      <ActionBar>
        <Link to={prevPage.current}>Go Back</Link>
      </ActionBar>

      <main className="createFeedback_new">
        <h1>Create New Feedback</h1>
        <p>
          All fields are required to create feedback. Please complete the form
          before submitting.
        </p>
        <FeedbackFormNew
          onCancel={() => navigate(prevPage.current)}
          errors={formData?.errors}
        />
      </main>
    </div>
  );
}

export default CreateFeedbackPage;
