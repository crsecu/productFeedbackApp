import { Link, Outlet, useLoaderData } from "react-router-dom";
import FeedbackBoardLayout from "../../ui/FeedbackBoardLayout";
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
  const dataFromLoader = useLoaderData() as FeedbackBoardLoaderData;

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
    <>
      <Outlet />
      <FeedbackBoardLayout
        leftSection={leftSection}
        mainSection={mainSection}
      />
    </>
  );
}

export default FeedbackBoardPage;
