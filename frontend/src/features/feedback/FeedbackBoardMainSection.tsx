import { ReactNode } from "react";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackBoardMainSection = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > section {
    gap: 2px;
  }

  @media ${device.sm} {
    gap: 24px;
  }
`;
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
