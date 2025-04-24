import { useLocation, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import SuggestionCount from "./SuggestionCount";
import SortBy from "./SortBy";

import { FeedbackBoardLoaderData } from "../../types/loader.types";

import FeedbackBoardMainSection from "./FeedbackBoardMainSection";

import FeedbackBoardLeftColumn from "./FeedbackBoardLeftColumn";
import { PrimaryLinkButton } from "../../styles/UIStyles";

const StyledFeedbackBoardPage = styled.div``;

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
      <FeedbackBoardLeftColumn suggestionCount={suggestions.length}>
        <RoadmapPreviewTile
          roadmapStats={roadmapStatusCounts}
          roadmapCount={roadmapFeedbackCount}
        />
      </FeedbackBoardLeftColumn>

      <FeedbackBoardMainSection>
        <ActionBar ariaLabel="Suggestions toolbar">
          <SuggestionCount suggestions={suggestions} />
          <SortBy />
          {/* <Link to="createFeedback" state={{ from: location?.pathname }}>
            Add Feedback
          </Link> */}
          <PrimaryLinkButton
            to="createFeedback"
            state={{ from: location?.pathname }}
          >
            + Add Feedback
          </PrimaryLinkButton>
        </ActionBar>
        <FeedbackList suggestions={suggestions} />
      </FeedbackBoardMainSection>
    </StyledFeedbackBoardPage>
  );
}

export default FeedbackBoardPage;
