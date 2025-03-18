import { Outlet, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";

function FeedbackDetailLayout(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <ActionBar>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        <h3>THIS IS THE LAYOUT</h3>

        <br></br>
        <br></br>
      </ActionBar>

      <Outlet />
    </>
  );
}

export default FeedbackDetailLayout;
