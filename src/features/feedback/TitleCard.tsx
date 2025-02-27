import { useNavigate } from "react-router-dom";

function TitleCard(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="titleCard">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Feedback Board
      </h1>
      <span>Frontend Mentor</span>
    </div>
  );
}

export default TitleCard;
