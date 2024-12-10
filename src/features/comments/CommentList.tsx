import Comment from "./Comment";
import { fetchComments } from "../../services/apiFeedback";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommentList } from "../feedback/feedbackSlice";
import { useAppSelector } from "../../types/hooks";

interface CommentListProps {
  commentCount: number;
  feedbackId: string;
}

function CommentList({
  commentCount,
  feedbackId,
}: CommentListProps): React.JSX.Element {
  const dispatch = useDispatch();
  const comments = useAppSelector((state) => state.feedback.commentList);

  useEffect(
    function () {
      async function retrieveComments() {
        const comments = await fetchComments(Number(feedbackId));
        dispatch(setCommentList(comments));
      }
      retrieveComments();
    },
    [dispatch, feedbackId]
  );

  if (comments.length === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommentList;
