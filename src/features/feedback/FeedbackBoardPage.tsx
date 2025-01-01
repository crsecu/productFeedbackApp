import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import FeedbackCount from "./FeedbackCount";
import SortBy from "./SortBy";
import { Link } from "react-router-dom";
import TitleCard from "./TitleCard";

function FeedbackBoardPage(): React.JSX.Element {
  return (
    <div className="feedbackBoard_layout">
      <div className="feecbackBoard_leftSection">
        <PageHeader>
          <TitleCard />
        </PageHeader>
        <aside className="feedbackBoard_aside">
          <FilterByCategory />
          <RoadmapPreviewTile />
        </aside>
      </div>

      <main className="feedbackBoard_main">
        <ActionBar>
          <FeedbackCount />
          <SortBy />
          <Link to={"/createFeedback"}>Add Feedback</Link>
        </ActionBar>

        <FeedbackList />
      </main>
    </div>
  );
}

export default FeedbackBoardPage;
