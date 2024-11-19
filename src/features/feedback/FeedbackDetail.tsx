import FeedbackCard from "./FeedbackCard";
import Comment from "../comments/Comment";

function FeedbackDetail(): React.JSX.Element {
  return (
    <>
      <header>
        <a>Go Back</a>
        <button>Edit Feedback</button>
      </header>
      <main>
        {/* <FeedbackCard /> */}
        <section>
          <h2>
            <span>4</span> Comments
          </h2>
          <ul>
            <Comment />
            <Comment />
          </ul>
        </section>
        <section>
          <h2>Add a Comment</h2>
          <textarea></textarea>
          <button>Post Comment</button>
        </section>
      </main>
    </>
  );
}

export default FeedbackDetail;
