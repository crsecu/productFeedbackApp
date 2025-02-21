import { useNavigate } from "react-router-dom";

function NotFoundPage(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1 style={{ color: "green" }}>404 - Page Not Found</h1>
    </div>
  );
}

export default NotFoundPage;
