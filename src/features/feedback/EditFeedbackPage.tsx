import { Form, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { deleteFeedback } from "../../services/apiFeedback";

function EditFeedbackPage(): React.JSX.Element {
  const {
    state: { id, category, description, status, title },
  } = useLocation();
  const navigate = useNavigate();

  async function handleDeleteFeedbackEntry() {
    await deleteFeedback(id);
    console.log("feedback entry deleted", id);

    navigate("/feedbackBoard");

    //TO DO: Display message to inform user that the feedback entry was deleted
  }

  function handleCancel() {
    console.log("canceling edit of feedback entry");
    navigate(-1);
  }

  return (
    <div className="editFeedback">
      <h1>Edit Feedback</h1>
      <Form method="PATCH">
        <label htmlFor="feedbackTitle">Title</label>
        <span id="feedbackTitleDesc">Add a short, descriptive headline</span>
        <input
          name="title"
          id="feedbackTitle"
          aria-describedby="feedbackTitleDesc"
          type="text"
          defaultValue={title}
          required
        ></input>

        <br></br>

        <label htmlFor="feedbackCategory">Category</label>
        <span id="feedbackCategoryDesc">
          {" "}
          Choose a category for your feedback
        </span>
        <select
          name="category"
          id="feedbackCategory"
          aria-describedby="feedbackCategoryDesc"
          required
          defaultValue={category}
        >
          <option value="Feature">Feature</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Bug">Bug</option>
        </select>

        <br></br>
        <label htmlFor="feedbackStatus">Update status</label>
        <span id="feedbackStatusDesc">Change feature state</span>
        <select
          id="feedbackStatus"
          name="status"
          aria-describedby="feedbackStatusDesc"
          required
          defaultValue={status}
        >
          <option value="Suggestion">Suggestion</option>
          <option value="Planned">Planned</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Live">Live</option>
        </select>
        <br></br>

        <label htmlFor="feedbackDescription">Feedback Detail</label>
        <span id="feedbackDescriptionDesc">
          Include any specific comments on what should be improved, added, etc.
        </span>
        <textarea
          name="description"
          id="feedbackDescription"
          aria-describedby="feedbackDescriptionDesc"
          maxLength={250}
          required
          defaultValue={description}
        ></textarea>

        <button>Edit Feedback</button>
        <button type="button" onClick={() => handleCancel()}>
          Cancel
        </button>
        <button type="button" onClick={() => handleDeleteFeedbackEntry()}>
          Delete
        </button>
      </Form>
    </div>
  );
}

export default EditFeedbackPage;
