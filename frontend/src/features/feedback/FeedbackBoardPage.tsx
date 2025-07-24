import { Outlet, useLoaderData, useLocation } from "react-router-dom";
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
import device from "../../styles/breakpoints";

const StyledFeedbackBoardPage = styled.div`
  width: initial;

  @media ${device.lg} {
    display: flex;
    gap: 30px;
  }
`;

function FeedbackBoardPage(): React.JSX.Element {
  const location = useLocation();
  const dataFromLoader = useLoaderData() as FeedbackBoardLoaderData;

  if (location.pathname === "/app/feedbackBoard/createFeedback")
    return <Outlet />;

  const { suggestions, roadmapFeedbackCount, roadmapStatusCounts } =
    dataFromLoader;

  return (
    <StyledFeedbackBoardPage className="1">
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
