import { Comment as CommentType } from "../feedback/feedback.types";
interface CommentProps {
  comment: CommentType;
}
function Comment({ comment }: CommentProps): React.JSX.Element {
  const {
    content,
    user: { image, name, username },
  } = comment;

  return (
    <>
      <div aria-label="Comment by ...">
        <div className="comment__author">
          <img src={image} alt="" />
          <div className="comment__authorInfo">
            <p>
              <strong>{name}</strong>
            </p>
            <span>{username}</span>
          </div>
        </div>
        <p>{content}</p>
        <button>Reply</button>
      </div>
      {comment.replies ? (
        <ul>
          {comment.replies.map((commentReply) => (
            <li>
              <Comment key={commentReply.id} comment={commentReply} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Comment;
