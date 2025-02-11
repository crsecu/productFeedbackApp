import { fetchComments } from "../../services/apiComment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommentList } from "../../store/slices/commentsSlice";
import { useAppSelector } from "../../types/hooks";
import { CommentListType } from "../../types/comment.types";
import Comment from "./Comment";
import { useNavigationType } from "react-router-dom";

interface CommentListProps {
  commentCount: number;
  feedbackId: string;
}

function CommentList({
  commentCount,
  feedbackId,
}: CommentListProps): React.JSX.Element {
  const dispatch = useDispatch();
  const navigationType = useNavigationType();

  const comments = useAppSelector((state) => state.comment.commentList);

  useEffect(
    function () {
      async function retrieveComments() {
        if (navigationType === "REPLACE") return;
        const comments: CommentListType = await fetchComments(feedbackId);
        dispatch(setCommentList(comments));
      }
      retrieveComments();
    },
    [dispatch, feedbackId, commentCount, navigationType]
  );
  const replies = comments.filter((comment) => comment.type === "reply"); //TO DO: memoize

  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul>
        {comments.map((comment) => {
          if (comment.type === "comment") {
            return (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  commentCount={commentCount}
                  replies={replies}
                />
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default CommentList;
