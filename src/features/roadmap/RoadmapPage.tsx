import { Link, Outlet } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import { useShowCreateFeedbackForm } from "../../utils/customHooks";
import { RoadmapLoaderData } from "../../types/feedback.types";
import RoadmapStatusBoard from "./RoadmapStatusBoard";

interface RoadmapPageProps {
  dataFromLoader: RoadmapLoaderData;
}
function RoadmapPage({ dataFromLoader }: RoadmapPageProps): React.JSX.Element {
  const isCreateFeedback = useShowCreateFeedbackForm();

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
            <Link
              to={"createFeedback"}
              state={{ from: location.pathname }}
              replace
            >
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
