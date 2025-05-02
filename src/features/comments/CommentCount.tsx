import { useRouteLoaderData } from "react-router-dom";
import { CommentData } from "../../types/comment.types";
import { FaComment } from "react-icons/fa";
import { StrongText } from "../../styles/UIStyles";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledCommentCount = styled.div`
  display: flex;
  gap: 9px;
  margin-left: auto;
  padding-top: 26px;
  justify-content: flex-end;

  //This style is only needed in FeedbackBoard;
  // it slightly pushes down the comment count (might not be needed)
  /* @media ${device.sm} {
    margin: 0;
    align-items: center;
    padding-top: 0;
    gap: 9px;
  } */
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
