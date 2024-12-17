import { useState } from "react";
import { Comment as CommentType } from "../feedback/feedback.types";
import CommentComposer from "./CommentComposer";

interface CommentProps {
  comment: CommentType;
  commentCount: number;
}
function Comment({ comment, commentCount }: CommentProps): React.JSX.Element {
  const {
    content,
    id,
    user: { image, name, username },
  } = comment;

  const [isAddReply, setIsAddReply] = useState(false);
  function handleReply() {
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
        {isAddReply && <p>Reply textarea goes here</p>}
      </div>
      {comment.replies ? (
        <ul>
          {comment.replies.map((commentReply) => (
            <li>
              <Comment
                key={commentReply.id}
                comment={commentReply}
                commentCount={commentCount}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Comment;
