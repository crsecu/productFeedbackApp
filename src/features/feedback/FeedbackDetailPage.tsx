import { useAppSelector } from "../../types/hooks";
import { useParams } from "react-router-dom";
import { getFeedbackDataById } from "./feedbackSlice";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "../comments/CommentList";
import Comment from "../comments/Comment";

function FeedbackDetailPage(): React.JSX.Element {
  const { feedbackId } = useParams();

  const feedback = useAppSelector(getFeedbackDataById(feedbackId));

  return (
    <>
      <header>
        <Link to={"/feedbackBoard"}>Go Back</Link>
        <br></br>
        <br></br>
        <button>Edit Feedback</button>
      </header>
      <main>
        <FeedbackCard feedback={feedback} isDetailPage={true} />
        <section>
          <h2>
            <span>4</span> Comments
          </h2>
          <CommentList comments={feedback.comments} />
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
