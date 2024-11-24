import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";

function FeedbackBoardPage(): React.JSX.Element {
  return (
    <div className="feedbackBoard_layout">
      <div className="feecbackBoard_leftSection">
        <PageHeader />
        <aside className="feedbackBoard_aside">
          <FilterByCategory />
          <RoadmapPreviewTile />
        </aside>
      </div>

      <main className="feedbackBoard_main">
        <ActionBar />

        <FeedbackList />
      </main>
    </div>
  );
}

export default FeedbackBoardPage;
