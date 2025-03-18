import { Link, Outlet, useRouteLoaderData } from "react-router-dom";

import { RoadmapLoaderData } from "../../types/feedback.types";
import RoadmapStatusBoard from "./RoadmapStatusBoard";
import ActionBar from "../../ui/ActionBar";

function RoadmapPage(): React.JSX.Element {
  const dataFromLoader = useRouteLoaderData("roadmapData") as RoadmapLoaderData;
  return (
    <>
      <Outlet />
      <ActionBar>
        <Link to="/feedbackBoard">Go Back</Link>
        <h1>Roadmap</h1>
        <Link to={"createFeedback"} state={{ from: location.pathname }}>
          Add Feedback
        </Link>
      </ActionBar>

      <RoadmapStatusBoard dataFromLoader={dataFromLoader} />
    </>
  );
}

export default RoadmapPage;
