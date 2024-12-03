import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "../comments/CommentList";
import { Feedback } from "./feedback.types";
import UpvoteButton from "./UpvoteButton";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackDataById } from "./feedbackSlice";

function FeedbackDetailPage(): React.JSX.Element {
  // Detail Page gets data from loader
  const loaderData = useLoaderData();
  const feedback = loaderData as Feedback;

  const { id, title, category, status, description, comments } = feedback;

  /* 
   use useAppSelector to access the latest upvotes from Redux state after updates
   this is necessary because the Detail Page relies on loader data, which isn't reactive to Redux state changes
   TO DO: refactor how Detail Page gets its data
   */
  const { upvotes } = useAppSelector(getFeedbackDataById(id));

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;

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
        <UpvoteButton upvotes={upvotes} feedbackId={id} />
        <FeedbackCard feedback={feedback} isDetailPage={true} />
        <section>
          <CommentList comments={comments} />
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
