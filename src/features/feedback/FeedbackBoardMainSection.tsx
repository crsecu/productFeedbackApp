import { ReactNode } from "react";
import styled from "styled-components";

const StyledFeedbackBoardMainSection = styled.main``;
interface FeedbackBoardMainSectionProps {
  children: ReactNode;
}
function FeedbackBoardMainSection({
  children,
}: FeedbackBoardMainSectionProps): React.JSX.Element {
  return (
    <StyledFeedbackBoardMainSection>{children}</StyledFeedbackBoardMainSection>
  );
}

export default FeedbackBoardMainSection;
