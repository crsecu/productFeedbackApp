import { Link, Outlet } from "react-router-dom";
import RoadmapStatusColumn from "./RoadmapStatusColumn";
import PageHeader from "../../ui/PageHeader";
import { useShowCreateFeedbackForm } from "../../utils/customHooks";
import { RoadmapLoaderData } from "../../types/feedback.types";

interface RoadmapPageProps {
  dataFromLoader: RoadmapLoaderData;
}
function RoadmapPage({ dataFromLoader }: RoadmapPageProps): React.JSX.Element {
  const isCreateFeedback = useShowCreateFeedbackForm();

  const { planned, "in-Progress": inProgress, live } = dataFromLoader;

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
          <main>
            <ul className="roadmap_devStatusPhases">
              <li>
                {planned && (
                  <RoadmapStatusColumn
                    feedbackList={planned}
                    title={"Planned"}
                    description="Ideas prioritized for research"
                  />
                )}
              </li>
              <li>
                {inProgress && (
                  <RoadmapStatusColumn
                    feedbackList={inProgress}
                    title={"in-Progress"}
                    description="Currently being developed"
                  />
                )}
              </li>
              <li>
                {live && (
                  <RoadmapStatusColumn
                    feedbackList={live}
                    title="Live"
                    description="Released features"
                  />
                )}
              </li>
            </ul>
          </main>
        </>
      )}
    </>
  );
}

export default RoadmapPage;
