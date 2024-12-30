import { Link } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { selectFeedbackCountsByStatus } from "../feedback/feedbackSlice";

function RoadmapPreviewTile(): React.JSX.Element {
  const {
    planned,
    "in-progress": inProgress,
    live,
  } = useAppSelector(selectFeedbackCountsByStatus);

  return (
    <section>
      <div style={{ display: "flex" }}>
        <h2>Roadmap</h2> {/*TO DO: add a clearer title for ADA */}
        <Link to="/developmentRoadmap" aria-label="View full roadmap">
          View
        </Link>
      </div>

      <div>
        <span>Planned</span>
        <span>{planned}</span>
      </div>
      <div>
        <span>In-Progress</span>
        <span>{inProgress}</span>
      </div>
      <div>
        <span>Live</span>
        <span>{live}</span>
      </div>
    </section>
  );
}

export default RoadmapPreviewTile;
