import FeedbackCard from "./FeedbackCard";
import Comment from "../comments/Comment";
import { useAppSelector } from "../../types/hooks";
import { useParams } from "react-router-dom";

function FeedbackDetailPage(): React.JSX.Element {
  const { feedbackId } = useParams();

  const feedback = useAppSelector((state) =>
    state.feedback.feedbackList.filter((feedback) => feedback.id === feedbackId)
  );
  console.log("data", feedback);
  return (
    <>
      <header>
        <a>Go Back</a>
        <button>Edit Feedback</button>
      </header>
      <main>
        <FeedbackCard feedback={feedback[0]} />
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

export default FeedbackDetailPage;
