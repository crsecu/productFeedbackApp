import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledTitleCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const MainHeading = styled.h1`
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-light);
  opacity: 0.75;
`;

const BrandingText = styled.span`
  font-size: 0.938rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.19px;
  color: var(--color-text-light);

  @media ${device.md} {
    letter-spacing: -0.25px;
  }
`;

function TitleCard(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <StyledTitleCard>
      <MainHeading>Feedback Board</MainHeading>
      <BrandingText onClick={() => navigate("/")}>Frontend Mentor</BrandingText>
    </StyledTitleCard>
  );
}

export default TitleCard;
