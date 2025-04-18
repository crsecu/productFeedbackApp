import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTitleCard = styled.div`
  background-color: pink;
`;
function TitleCard(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <StyledTitleCard>
      <h1 onClick={() => navigate("/")}>Feedback Board</h1>
      <span>Frontend Mentor</span>
    </StyledTitleCard>
  );
}

export default TitleCard;
