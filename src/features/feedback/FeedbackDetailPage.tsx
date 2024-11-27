import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "../comments/CommentList";
import { Feedback } from "./feedback.types";

function FeedbackDetailPage(): React.JSX.Element {
  // Detail Page gets data from loader
  const loaderData = useLoaderData();

  const feedback = loaderData as Feedback;

  const { id, title, category, status, description, comments } = feedback;

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
