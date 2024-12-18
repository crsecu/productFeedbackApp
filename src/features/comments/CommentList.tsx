import { fetchComments } from "../../services/apiComment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommentList } from "./commentsSlice";
import { useAppSelector } from "../../types/hooks";
import { Comment as CommentType } from "../feedback/feedback.types";
import Comment from "./Comment";

interface CommentListProps {
  commentCount: number;
  feedbackId: string;
}

function CommentList({
  commentCount,
  feedbackId,
}: CommentListProps): React.JSX.Element {
  const dispatch = useDispatch();
  const comments = useAppSelector((state) => state.comment.commentList);

  useEffect(
    function () {
      async function retrieveComments() {
        const comments: CommentType[] = await fetchComments(Number(feedbackId));
        dispatch(setCommentList(comments));
      }
      retrieveComments();
    },
    [dispatch, feedbackId, commentCount]
  );

  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <Comment comment={comment} commentCount={commentCount} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CommentList;
