import { Link, Outlet } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import { RoadmapLoaderData } from "../../types/feedback.types";
import RoadmapStatusBoard from "./RoadmapStatusBoard";
import ActionBar from "../../ui/ActionBar";

interface RoadmapPageProps {
  dataFromLoader: RoadmapLoaderData;
}
function RoadmapPage({ dataFromLoader }: RoadmapPageProps): React.JSX.Element {
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
