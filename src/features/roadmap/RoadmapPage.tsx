import { Link, Outlet } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import { RoadmapLoaderData } from "../../types/feedback.types";
import RoadmapStatusBoard from "./RoadmapStatusBoard";

interface RoadmapPageProps {
  dataFromLoader: RoadmapLoaderData;
}
function RoadmapPage({ dataFromLoader }: RoadmapPageProps): React.JSX.Element {
  return (
    <>
      <Outlet />
      <>
        <PageHeader>
          <Link to="/feedbackBoard">Go Back</Link>
          <h1>Roadmap</h1>
          <Link to={"createFeedback"} state={{ from: location.pathname }}>
            Add Feedback
          </Link>
        </PageHeader>
        <main>{<RoadmapStatusBoard dataFromLoader={dataFromLoader} />}</main>
      </>
    </>
  );
}

export default RoadmapPage;
