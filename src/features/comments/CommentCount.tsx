import { useLoaderData } from "react-router-dom";
import { CommentData } from "../feedback/FeedbackDetailContent";

interface CommentCountProps {
  count?: number; // used by FeedbackBoard
}
function CommentCount({ count }: CommentCountProps): React.JSX.Element {
  //extract commentCount from loader data when available
  const loaderData = useLoaderData() as CommentData;
  const commentCount = loaderData?.commentCount ?? count;

  return (
    <>
      <span>Comment count {commentCount}</span>
      <br></br>
    </>
  );
}

export default CommentCount;
