import { useParams } from "react-router-dom";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "../comments/CommentList";
import UpvoteButton from "./UpvoteButton";
import { Feedback } from "./feedback.types";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackDataById } from "./feedbackSlice";

function FeedbackDetailPage(): React.JSX.Element {
  // extract feedbackId from URL parameters
  const { feedbackId } = useParams();

  /*
  extract query parameters:
  - after editing a feedback entry, a "status=edited" query parameter is appended to the URL
  - this parameter is used to identify that the feedback has been recently updated, allowing the component 
  - to display updated data from the loader instead of potentially stale Redux state
 */
  const [searchParams] = useSearchParams();
  const feedbackEditStatus = searchParams.get("status");

  /*
  the loader checks if the feedback data exists in the Redux state to avoid redundant API calls
  fetches the data from the API if:
   - the data is unavailable
   - the query param "status=edited" exists (indicates the feedback has been recently updated)
 */
  const loaderData = useLoaderData();
  const feedbackFromLoader = loaderData as Feedback;

  /*
  access Redux state:
  - get the feedback entry by ID from the Redux store; this minimizes unnecessary API calls when data is available in Redux 
  */
  const feedbackFromRedux: Feedback = useAppSelector(
    getFeedbackDataById(feedbackId)
  );

  /*
  determine the source of feedback data:
  - priority is given to Redux state to avoid unnecessary API calls
  - if the Redux state is unavailable or the feedback has been recently updated (indicated by the "status=edited" query param), 
  fall back to the loader data to ensure up to date information
  */

  const feedback =
    feedbackFromRedux && feedbackEditStatus === null
      ? feedbackFromRedux
      : feedbackFromLoader;

  const { id, title, category, status, description, comments, upvotes } =
    feedback;

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
