import { useRouteLoaderData } from "react-router-dom";
import { CommentData } from "../../types/comment.types";
import { FaComment } from "react-icons/fa";
import { StrongText } from "../../styles/UIStyles";
import styled from "styled-components";

const StyledCommentCount = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  margin-right: 6px;
  align-items: center;
`;

interface CommentCountProps {
  count?: number; // used by FeedbackBoard
}

function CommentCount({ count }: CommentCountProps): React.JSX.Element {
  //extract commentCount from loader data when available
  const loaderData = useRouteLoaderData("commentData") as CommentData;
  const commentCount = loaderData?.commentCount ?? count;

  return (
    <StyledCommentCount>
      <FaComment color="CDD2EE" size="1.125rem" />
      <StrongText>{commentCount}</StrongText>
    </StyledCommentCount>
  );
}

export default CommentCount;
