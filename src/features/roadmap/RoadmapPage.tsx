import { Link, Outlet, useLoaderData } from "react-router-dom";
import RoadmapStatusColumn from "./RoadmapStatusColumn";
import PageHeader from "../../ui/PageHeader";
import { FeedbackType, RoadmapStatusType } from "../../types/feedback.types";
import { useShowCreateFeedbackForm } from "../../utils/customHooks";

function RoadmapPage(): React.JSX.Element {
  const dataFromLoader = useLoaderData() as Record<
    RoadmapStatusType,
    FeedbackType[]
  >;

  const isCreateFeedback = useShowCreateFeedbackForm();
  console.log("isCreateFeedback", isCreateFeedback);

  const { planned, "in-Progress": inProgress, live } = dataFromLoader;

  return (
    <>
      {isCreateFeedback ? (
        <Outlet />
      ) : (
        <>
          {" "}
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
