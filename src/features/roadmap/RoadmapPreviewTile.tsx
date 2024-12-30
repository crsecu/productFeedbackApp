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
      <h2>Roadmap</h2> {/*TO DO: add a clearer title for ADA */}
      <a>View</a>
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
