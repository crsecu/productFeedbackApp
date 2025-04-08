import { Link, useLocation, useRouteLoaderData } from "react-router-dom";

import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import SuggestionCount from "./SuggestionCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";
import { FeedbackBoardLoaderData } from "../../types/loader.types";

function FeedbackBoardPage(): React.JSX.Element {
  const dataFromLoader = useRouteLoaderData(
    "feedbackBoardData"
  ) as FeedbackBoardLoaderData;

  const { suggestions, roadmapFeedbackCount, roadmapStatusCounts } =
    dataFromLoader;
  const location = useLocation();
  console.log("location FEEDBACK BOARD", location);

  const leftSection = (
    <>
      <PageHeader>
        <TitleCard />
      </PageHeader>
      <aside className="feedbackBoard_aside">
        <FilterByCategory suggestionCount={suggestions.length} />
        <RoadmapPreviewTile
          roadmapStats={roadmapStatusCounts}
          roadmapCount={roadmapFeedbackCount}
        />
      </aside>
    </>
  );

  const mainSection = (
    <>
      <ActionBar>
        <SuggestionCount suggestions={suggestions} />
        <SortBy />
        <Link to="createFeedback" state={{ from: location?.pathname }}>
          Add Feedback
        </Link>
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
