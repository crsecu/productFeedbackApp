import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import SuggestionCount from "./SuggestionCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";
import { FeedbackBoardLoaderData } from "../../types/loader.types";
import FeedbackBoardSidebar from "./FeedbackBoardSidebar";
import FeedbackBoardMainSection from "./FeedbackBoardMainSection";

const StyledFeedbackBoardPage = styled.div`
  display: flex;
`;

function FeedbackBoardPage(): React.JSX.Element {
  const dataFromLoader = useRouteLoaderData(
    "feedbackBoardData"
  ) as FeedbackBoardLoaderData;

  const { suggestions, roadmapFeedbackCount, roadmapStatusCounts } =
    dataFromLoader;
  const location = useLocation();
  console.log("location FEEDBACK BOARD", location);

  return (
    <StyledFeedbackBoardPage>
      <FeedbackBoardSidebar>
        <PageHeader>
          <TitleCard />
        </PageHeader>
        <aside aria-label="Feedback filters and roadmap">
          <FilterByCategory suggestionCount={suggestions.length} />
          <RoadmapPreviewTile
            roadmapStats={roadmapStatusCounts}
            roadmapCount={roadmapFeedbackCount}
          />
        </aside>
      </FeedbackBoardSidebar>

      <FeedbackBoardMainSection>
        <ActionBar ariaLabel="Suggestions toolbar">
          <SuggestionCount suggestions={suggestions} />
          <SortBy />
          <Link to="createFeedback" state={{ from: location?.pathname }}>
            Add Feedback
          </Link>
        </ActionBar>

        <FeedbackList suggestions={suggestions} />
      </FeedbackBoardMainSection>
    </StyledFeedbackBoardPage>
  );
}

export default FeedbackBoardPage;
