import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";

function FeedbackBoard(): React.JSX.Element {
  return (
    <>
      <PageHeader />
      <aside>
        <FilterByCategory />
        <RoadmapPreviewTile />
      </aside>
      <main>
        <ActionBar />
        <FeedbackList />
      </main>
    </>
  );
}

export default FeedbackBoard;
