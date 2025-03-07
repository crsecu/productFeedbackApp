import { Link, Outlet } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import { useShowCreateFeedback } from "../../utils/customHooks";
import { RoadmapLoaderData } from "../../types/feedback.types";
import RoadmapStatusBoard from "./RoadmapStatusBoard";

interface RoadmapPageProps {
  dataFromLoader: RoadmapLoaderData;
}
function RoadmapPage({ dataFromLoader }: RoadmapPageProps): React.JSX.Element {
  const isCreateFeedback = useShowCreateFeedback();

  console.log("data loader roadmap", dataFromLoader);

  return (
    <>
      {isCreateFeedback ? (
        <Outlet />
      ) : (
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
      )}
    </>
  );
}

export default RoadmapPage;
