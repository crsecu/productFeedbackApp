import { Link, useLoaderData } from "react-router-dom";
import RoadmapStatusColumn from "./RoadmapStatusColumn";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackByAllStatusCategories } from "../feedback/feedbackSlice";
import { statusCategories } from "../feedback/feedbackSlice";
import PageHeader from "../../ui/PageHeader";
import { FeedbackType } from "../../types/feedback.types";

//function modalRoadmapDevelopmentData(data)

function RoadmapPage(): React.JSX.Element {
  const dataFromLoader = useLoaderData() as FeedbackType[];
  console.log("data from loader", dataFromLoader);

  const {
    planned,
    "in-progress": inProgress,
    live,
  } = useAppSelector((state) =>
    getFeedbackByAllStatusCategories(statusCategories)(state)
  );

  //const roadmapStatusColumn = dataFromLoader

  return (
    <>
      <PageHeader>
        <Link to="/feedbackBoard">Go Back</Link>
        <h1>Roadmap</h1>
        <Link to={"/createFeedback"}>Add Feedback</Link>
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
                title={"In-Progress"}
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
  );
}

export default RoadmapPage;
