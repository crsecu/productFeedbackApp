import { Form, useNavigate } from "react-router-dom";
import { deleteFeedback } from "../../services/apiFeedback";

interface FeedbackFormProps {
  httpMethod: "POST" | "PATCH";
  mode: "create" | "edit";
  feedbackEntryData: {
    id: string;
    title: string;
    category: string;
    status: string;
    description: string;
  };
  closeModal?: () => void;
}
function FeedbackForm({
  httpMethod,
  mode,
  feedbackEntryData,
  closeModal,
}: FeedbackFormProps): React.JSX.Element {
  const navigate = useNavigate();

  const mainButton = mode === "create" ? "Add Feedback" : "Save Changes";

  async function handleDeleteFeedbackEntry() {
    await deleteFeedback(feedbackEntryData.id);
    console.log("feedback entry deleted", feedbackEntryData.id);

    navigate("/feedbackBoard");

    //TO DO: Display message to inform user that the feedback entry was deleted
  }

  return (
    <Form method={httpMethod} replace onSubmit={closeModal}>
      {mode === "edit" && (
        <input type="hidden" name="formType" value="editFeedback" />
      )}

      <label htmlFor="feedbackTitle">Feedback Title</label>
      <span id="feedbackTitleDesc">Add a short, descriptive headline</span>
      <input
        type="text"
        name="title"
        id="feedbackTitle"
        aria-describedby="feedbackTitleDesc"
        defaultValue={mode === "edit" ? feedbackEntryData?.title : undefined}
        required
      ></input>

      <br></br>

      <label htmlFor="feedbackCategory">Category</label>
      <span id="feedbackCategoryDesc">Choose a category for your feedback</span>
      <select
        name="category"
        id="feedbackCategory"
        aria-describedby="feedbackCategoryDesc"
        defaultValue={mode === "edit" ? feedbackEntryData?.category : undefined}
        required
      >
        <option value="Feature">Feature</option>
        <option value="UI">UI</option>
        <option value="UX">UX</option>
        <option value="Enhancement">Enhancement</option>
        <option value="Bug">Bug</option>
      </select>
      <br></br>

      {mode === "edit" && (
        <>
          <label htmlFor="feedbackStatus">Update status</label>
          <span id="feedbackStatusDesc">Change feature state</span>
          <select
            id="feedbackStatus"
            name="status"
            aria-describedby="feedbackStatusDesc"
            defaultValue={
              mode === "edit" ? feedbackEntryData?.status : undefined
            }
            required
          >
            <option value="suggestion">Suggestion</option>
            <option value="planned">Planned</option>
            <option value="in-Progress">in-Progress</option>
            <option value="live">Live</option>
          </select>
        </>
      )}

      <label htmlFor="feedbackDescription">Feedback Detail</label>
      <span id="feedbackDescriptionDesc">
        Include any specific comments on what should be improved, added, etc.
      </span>
      <textarea
        name="description"
        id="feedbackDescription"
        aria-describedby="feedbackDescriptionDesc"
        maxLength={250}
        defaultValue={
          mode === "edit" ? feedbackEntryData?.description : undefined
        }
        required
      ></textarea>
      <footer>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button>{mainButton}</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => handleDeleteFeedbackEntry()}
              style={{ marginRight: "auto" }}
            >
              Delete Entry
            </button>
          )}
        </div>
      </footer>
    </Form>
  );
}

export default FeedbackForm;
