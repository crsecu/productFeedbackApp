import { useNavigate } from "react-router-dom";

function TitleCard(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <h1 onClick={() => navigate("/")}>Feedback Board</h1>
      <span>Frontend Mentor</span>
    </>
  );
}

export default TitleCard;
