import { Link } from "react-router-dom";
import RoadmapStatusColumn from "./RoadmapStatusColumn";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackByAllStatusCategories } from "../feedback/feedbackSlice";
import { statusCategories } from "../feedback/feedbackSlice";

function RoadmapPage(): React.JSX.Element {
  const {
    planned,
    "in-progress": inProgress,
    live,
  } = useAppSelector((state) =>
    getFeedbackByAllStatusCategories(statusCategories)(state)
  );

  return (
    <>
      <header className="roadmap_header">
        <Link to="/feedbackBoard">Go Back</Link>
        <h1>Roadmap</h1>
      </header>
      <main className="roadmap_devStatusPhases">
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
