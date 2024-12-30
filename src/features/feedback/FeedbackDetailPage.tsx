import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";
import FeedbackItem from "./FeedbackItem";
import CommentComposer from "../comments/CommentComposer";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const feedback = loaderData as FeedbackType;

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;

  const {
    id,
    title,
    category,
    status,
    description,
    commentCount: rawCommentCount,
  } = feedback;
  const commentCount = rawCommentCount ?? 0;

  return (
    <>
      <header>
        {/* <Link to={"/feedbackBoard"}>Go Back</Link> */}
        <button onClick={() => navigate(-1)}>Go Back</button>
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
        <FeedbackItem feedbackItem={feedback} isDetailPage={true} />
        <section>
          <CommentList commentCount={commentCount} feedbackId={id} />
        </section>
        <section>
          <h2>Add a Comment</h2>
          <CommentComposer commentCount={commentCount} />
        </section>
      </main>
    </>
  );
}

export default FeedbackDetailPage;
