import { Form } from "react-router-dom";
function CreateFeedbackPage(): React.JSX.Element {
  return (
    <div className="createFeedback_new">
      <h1>Create New Feedback</h1>
      <Form method="POST" action="/createFeedback">
        <label htmlFor="feedbackTitle">Feedback Title</label>
        <span id="feedbackTitleDesc">Add a short, descriptive headline</span>
        <input
          type="text"
          name="title"
          id="feedbackTitle"
          aria-describedby="feedbackTitleDesc"
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
        >
          <option value="Feature">Feature</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Bug">Bug</option>
        </select>
        <br></br>

        <label htmlFor="feedbackDetailComment">Feedback Detail</label>
        <span id="feedbackDetailCommentDesc">
          Include any specific comments on what should be improved, added, etc.
        </span>
        <textarea
          name="comment"
          id="feedbackDetailComment"
          aria-describedby="feedbackDetailCommentDesc"
          maxLength={250}
        ></textarea>
      </Form>
    </div>
  );
}

export default CreateFeedbackPage;
