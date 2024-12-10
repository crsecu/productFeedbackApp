import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "../comments/CommentList";
import UpvoteButton from "./UpvoteButton";
import { Feedback } from "./feedback.types";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackUpvoteCount } from "./feedbackSlice";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const feedback = loaderData as Feedback;
  /* Read the upvote count from the Redux state to ensure the UI displays the latest value after upvote/unvote user interactions */
  const upvoteCount = useAppSelector(getFeedbackUpvoteCount(feedback.id));

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;

  const { id, title, category, status, description, commentCount, upvotes } =
    feedback;

  return (
    <>
      <header>
        <Link to={"/feedbackBoard"}>Go Back</Link>
        <br></br>
        <br></br>
        <Link
          to={`/editFeedback/${id}`}
          state={{ id, title, category, status, description }}
        >
          Edit Feedback
        </Link>
      </header>
      <main>
        <UpvoteButton
          upvotes={upvoteCount ? upvoteCount : upvotes}
          feedbackId={id}
        />
        <FeedbackCard feedback={feedback} isDetailPage={true} />
        <section>
          <CommentList commentCount={commentCount} feedbackId={id} />
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
