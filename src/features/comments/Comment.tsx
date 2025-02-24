import { useState } from "react";
import { CommentKindType, CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "./CommentComposer";
import UserAvatar from "../user/UserAvatar";
import UserInfo from "../user/UserInfo";

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
      <div aria-label="Comment by ..." style={{ margin: "30px 0 30px  0" }}>
        <UserAvatar imageUrl={image} />
        <div style={{ display: "flex" }}>
          <UserInfo name={name} username={username} />
          {parentType !== "reply" && (
            <button
              onClick={() => setShowAddReply((prevState) => !prevState)}
              style={{ marginLeft: "auto" }}
            >
              Reply
            </button>
          )}
        </div>
        <p style={{ marginBottom: "none" }}>{content}</p>

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
