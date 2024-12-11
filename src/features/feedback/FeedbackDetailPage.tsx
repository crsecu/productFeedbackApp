import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Feedback } from "./feedback.types";
import CommentList from "../comments/CommentList";
import FeedbackItem from "./FeedbackItem";
import CreateComment from "../comments/CreateComment";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const feedback = loaderData as Feedback;

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;

  const { id, title, category, status, description, commentCount } = feedback;

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
        <FeedbackItem feedbackItem={feedback} />
        <section>
          <CommentList commentCount={commentCount} feedbackId={id} />
        </section>
        <section>
          <CreateComment />
        </section>
      </main>
    </>
  );
}

export default FeedbackDetailPage;
