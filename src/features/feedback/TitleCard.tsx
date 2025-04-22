import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { H1 } from "../../styles/Typography";

const StyledTitleCard = styled.div``;
const SubHeading = styled.span`
  font-size: var(--font-size-body-3);
  font-weight: 500;
  line-height: var(--line-height-body-3);
  color: var(--color-text-light);
  opacity: 0.75;
`;

function TitleCard(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <StyledTitleCard>
      <H1 onClick={() => navigate("/")} $textLight>
        Frontend Mentor
      </H1>
      <SubHeading>Feedback Board</SubHeading>
    </StyledTitleCard>
  );
}

export default TitleCard;
