import { useMemo } from "react";
import { CommentThreadEntry } from "../../types/comment.types";
import UserAvatar from "../user/UserAvatar";
import UserInfo from "../user/UserInfo";
import AddReply from "./AddReply";
import styled from "styled-components";
import User from "../user/User";

const StyledComment = styled.li`
  position: relative;
  padding-top: 22px;

  &:after {
    content: " ";
    display: block;

    border-bottom: 1px solid var(--color-divider);
    margin-top: 22px;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:last-child:after {
    display: none;
  }

  & ul {
    margin-left: 18px;
    position: relative;
  }

  & ul & li:after {
    display: none;
  }

  & ul:after {
    content: "";
    position: absolute;
    opacity: 10%;
    border-left: 1px solid var(--color-muted);
    top: 2px;
    left: -20px;
    height: 58%;
  }

  & .reply {
    top: 38px;
  }
`;

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

  const replies = useMemo(() => {
    return comment.replies.map((commentReply) => {
      return (
        <Comment
          comment={commentReply}
          commentCount={commentCount}
          key={commentReply.id}
        />
      );
    });
  }, [comment.replies, commentCount]);

  return (
    <StyledComment aria-label="Comment by ...">
      <User>
        <UserAvatar imageUrl={image} />
        <UserInfo name={name} username={username} />
      </User>

      <p>{content}</p>

      {parentType !== "reply" && (
        <AddReply parentComment={comment} commentCount={commentCount} />
      )}

      {comment.replies && comment.replies.length > 0 && <ul>{replies}</ul>}
    </StyledComment>
  );
}

export default Comment;
