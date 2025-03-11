import { CommentThreadEntry } from "../../types/comment.types";

import UserAvatar from "../user/UserAvatar";
import UserInfo from "../user/UserInfo";
import AddReply from "../feedback/AddReply";

interface CommentProps {
  comment: CommentThreadEntry;
  commentCount: number;
}
function Comment({ comment, commentCount }: CommentProps): React.JSX.Element {
  const {
    content,
    parentType,
    user: { image, name, username },
  } = comment;

  return (
    <>
      <div aria-label="Comment by ..." className="comment">
        <UserAvatar imageUrl={image} />
        <div style={{ display: "flex" }}>
          <UserInfo name={name} username={username} />
        </div>
        <p style={{ marginBottom: "none" }}>{content}</p>
        {parentType !== "reply" && (
          <AddReply parentComment={comment} commentCount={commentCount} />
        )}
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
