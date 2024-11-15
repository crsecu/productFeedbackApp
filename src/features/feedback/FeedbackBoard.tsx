import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";

function FeedbackBoard(): React.JSX.Element {
  return (
    <div>
      <PageHeader />
      <FilterByCategory />
      <RoadmapPreviewTile />
      <FeedbackList />
    </div>
  );
}

export default FeedbackBoard;
