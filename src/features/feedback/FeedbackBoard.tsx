import { useLoaderData } from "react-router-dom";
import { Feedback } from "./feedback.types";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";

function FeedbackBoard(): React.JSX.Element {
  const feedbackData = useLoaderData() as Feedback[];
  console.log(feedbackData);
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

        <FeedbackList data={feedbackData} />
      </main>
    </div>
  );
}

export default FeedbackBoard;
