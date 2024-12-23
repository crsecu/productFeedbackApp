import { useState } from "react";
import {
  CommentType,
  ReplyType,
  CommentKindType,
} from "../../types/comment.types";
import CommentComposer from "./CommentComposer";

interface CommentProps {
  comment: CommentType | ReplyType;
  replies?: ReplyType[];
  commentCount: number;
}
function Comment({
  comment,
  replies,
  commentCount,
}: CommentProps): React.JSX.Element {
  const {
    content,
    id,
    parentType,
    user: { image, name, username },
  } = comment;

  const parentTypeVariant: CommentKindType = parentType ? "comment" : "reply";
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
        {isAddReply && (
          <CommentComposer
            mode="reply"
            parentId={id as string}
            parentType={parentTypeVariant}
            authorUsername={username}
            commentCount={commentCount}
          />
        )}
      </div>
      {replies ? (
        <ul>
          {replies.map((commentReply) => {
            if (commentReply.parentId === id) {
              return (
                <li key={commentReply.id}>
                  <Comment
                    comment={commentReply}
                    commentCount={commentCount}
                    replies={replies}
                  />
                </li>
              );
            }
          })}
        </ul>
      ) : null}
    </>
  );
}

export default Comment;
