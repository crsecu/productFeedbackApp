import { useState } from "react";
import {
  Comment as CommentType,
  CommentReply,
} from "../feedback/feedback.types";
import CommentComposer from "./CommentComposer";

interface CommentProps {
  comment: CommentType | CommentReply;
  commentCount: number;
}
function Comment({ comment, commentCount }: CommentProps): React.JSX.Element {
  const {
    content,
    id,
    replies,
    parentId,
    user: { image, name, username },
  } = comment;

  const [isAddReply, setIsAddReply] = useState(false);
  function handleReply() {
    console.log("ROOT COMMENT", comment);
    setIsAddReply((prevState) => !prevState);
  }

  return (
    <>
      <div aria-label="Comment by ...">
        <div className="comment__author">
          <img src={image} alt="" />
          <div className="comment__authorInfo">
            <h2>COMMENT #{id}</h2>
            <p>
              <strong>{name}</strong>
            </p>
            <span>{username}</span>
          </div>
        </div>
        <p>{content}</p>
        <button onClick={handleReply}>Reply</button>
        {isAddReply && (
          <CommentComposer
            mode="reply"
            rootCommentData={{
              id,
              parentId,
              authorUsername: username,
              replies: replies,
            }}
            commentCount={commentCount}
          />
        )}
      </div>
      {comment.replies ? (
        <ul>
          {replies.map((commentReply) => (
            <li key={commentReply.id}>
              <Comment comment={commentReply} commentCount={commentCount} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Comment;
