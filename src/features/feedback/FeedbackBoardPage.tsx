import { Link, useRouteLoaderData } from "react-router-dom";

import { FeedbackBoardLoaderData } from "../../types/feedback.types";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import SuggestionCount from "./SuggestionCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";

function FeedbackBoardPage(): React.JSX.Element {
  //const dataFromLoader = useLoaderData() as FeedbackBoardLoaderData;
  const dataFromLoader = useRouteLoaderData(
    "feedbackBoardData"
  ) as FeedbackBoardLoaderData;
  if (!dataFromLoader) return <p>Unavailable</p>;
  const { suggestions, roadmapStatusCounts, roadmapTotal } = dataFromLoader;

  const leftSection = (
    <>
      <PageHeader>
        <TitleCard />
      </PageHeader>
      <aside className="feedbackBoard_aside">
        <FilterByCategory suggestionCount={suggestions.length} />
        <RoadmapPreviewTile
          roadmapStats={roadmapStatusCounts}
          roadmapCount={roadmapTotal}
        />
      </aside>
    </>
  );

  const mainSection = (
    <>
      <ActionBar>
        <SuggestionCount suggestions={suggestions} />
        <SortBy />
        <Link to="createFeedback">Add Feedback</Link>
      </ActionBar>

      <FeedbackList suggestions={suggestions} />
    </>
  );

  return (
    <div className="feedbackBoard_layout">
      <div className="feecbackBoard_leftSection">{leftSection}</div>
      <main className="feedbackBoard_main">{mainSection}</main>
    </div>
  );
}

export default FeedbackBoardPage;
