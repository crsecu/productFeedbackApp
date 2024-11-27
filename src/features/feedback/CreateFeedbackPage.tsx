import { Form } from "react-router-dom";

function CreateFeedbackPage(): React.JSX.Element {
  return (
    <div className="createFeedback_new">
      <h1>Create New Feedback</h1>
      <p>
        All fields are required to create feedback. Please complete the form
        before submitting.
      </p>
      <Form method="POST" action="/createFeedback">
        <label htmlFor="feedbackTitle">Feedback Title</label>
        <span id="feedbackTitleDesc">Add a short, descriptive headline</span>
        <input
          type="text"
          name="title"
          id="feedbackTitle"
          aria-describedby="feedbackTitleDesc"
          required
        ></input>

        <br></br>

        <label htmlFor="feedbackCategory">Category</label>
        <span id="feedbackCategoryDesc">
          Choose a category for your feedback
        </span>
        <select
          name="category"
          id="feedbackCategory"
          aria-describedby="feedbackCategoryDesc"
          required
        >
          <option value="Feature">Feature</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Bug">Bug</option>
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
        ></textarea>

        <button>Add Feedback</button>
      </Form>
    </div>
  );
}

export default CreateFeedbackPage;
