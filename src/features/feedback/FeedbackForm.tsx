import { Form, useNavigate } from "react-router-dom";

interface FeedbackFormProps {
  children?: React.ReactNode;
  httpMethod: "POST" | "PATCH";
  mode: "create" | "edit";
  feedbackEntryData?: {
    id: string;
    title: string;
    category: string;
    status: string;
    description: string;
  };
}
function FeedbackForm({
  children,
  httpMethod,
  mode,
  feedbackEntryData,
}: FeedbackFormProps): React.JSX.Element {
  const navigate = useNavigate();

  function handleCancel() {
    console.log("canceling edit of feedback entry");
    navigate(-1);
  }

  const mainButton = mode === "create" ? "Add Feedback" : "Save Changes";
  return (
    <Form method={httpMethod} replace>
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
            <option value="in-Progress">In-Progress</option>
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
        <div>
          <button>{mainButton}</button>
          <button type="button" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </footer>

      {children}
    </Form>
  );
}

export default FeedbackForm;
