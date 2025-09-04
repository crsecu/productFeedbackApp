import { Link } from "react-router-dom";
import {
  InProgressFeedback,
  LiveFeedback,
  PlannedFeedback,
} from "../../types/feedback.types";

import UpvoteButton from "../feedback/UpvoteButton";
import FeedbackCardContent from "../feedback/FeedbackCardContent";

import CommentCount from "../comments/CommentCount";
import styled from "styled-components";
import { RoadmapStatus } from "../../types/roadmap.types";
import device from "../../styles/breakpoints";
import { Card } from "../../styles/features/FeedbackStyles";

export const RoadmapFeedbackCard = styled(Card)<{
  $status: RoadmapStatus;
}>`
  border-radius: 6px;
  height: 235px;

  & a {
    height: 100%;
    border-top: 6px solid ${(props) => `var(--color-status-${props.$status})`};
    border-radius: 6px;
  }

  & button,
  label {
    font-size: var(--text-xs);
  }

  @media ${device.md} {
    height: 240px;
  }

  @media ${device.lg} {
    height: 260px;
  }

  @media (max-width: 1023px) {
    & span,
    p,
    h3 {
      font-size: var(--text-xs);
    }
  }
`;

interface RoadmapStatusSectionProps {
  feedbackList: PlannedFeedback[] | InProgressFeedback[] | LiveFeedback[];
}

/* This component renders a feedback card list based on status: planned, in-Progress, live */
function RoadmapStatusSection({
  feedbackList,
}: RoadmapStatusSectionProps): React.JSX.Element {
  //TO DO: memoize
  const feedbackCards = feedbackList.map((feedbackItem) => {
    return (
      <li key={feedbackItem.id}>
        <RoadmapFeedbackCard $status={feedbackItem.status}>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
            isUpvotedByCurrentUser={feedbackItem.isUpvotedByCurrentUser}
          />
          <Link to={`/app/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCardContent feedback={feedbackItem} />
            <CommentCount count={feedbackItem.comments} />
          </Link>
        </RoadmapFeedbackCard>
      </li>
    );
  });
  return <ul>{feedbackCards}</ul>;
}

export default RoadmapStatusSection;
