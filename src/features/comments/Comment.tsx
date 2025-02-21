import { useState } from "react";
import { CommentKindType, CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "./CommentComposer";

interface CommentProps {
  comment: CommentThreadEntry;
  commentCount: number;
}
function Comment({ comment, commentCount }: CommentProps): React.JSX.Element {
  const [showAddReply, setShowAddReply] = useState(false);

  const {
    content,
    id,
    parentType,
    user: { image, name, username },
  } = comment;

  const parentTypeVariant: CommentKindType =
    parentType === null ? "comment" : "reply";

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
        {parentType !== "reply" && (
          <button onClick={() => setShowAddReply((prevState) => !prevState)}>
            Reply
          </button>
        )}

        <div className={!showAddReply ? "hidden" : ""}>
          <CommentComposer
            mode="reply"
            setShowAddReply={setShowAddReply}
            parentId={id as string}
            parentType={parentTypeVariant}
            authorUsername={username}
            commentCount={commentCount}
          />
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((commentReply) => {
            return (
              <li key={commentReply.id}>
                <Comment comment={commentReply} commentCount={commentCount} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Comment;
