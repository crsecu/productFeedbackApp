import { Link } from "react-router-dom";
import {
  InProgressFeedback,
  LiveFeedback,
  PlannedFeedback,
} from "../../types/feedback.types";

import UpvoteButton from "../feedback/UpvoteButton";
import FeedbackCardContent from "../feedback/FeedbackCardContent";

import { ReactNode } from "react";
import CommentCount from "../comments/CommentCount";
import styled from "styled-components";
import { RoadmapStatus } from "../../types/roadmap.types";
import { StatusIndicator1 } from "../../styles/features/RoadmapStyles";
import { capitalizeFirstLetter } from "../../utils/helpers";
import device from "../../styles/breakpoints";
import { Card } from "../../styles/features/FeedbackStyles";

const RoadmapFeedbackCard = styled(Card)<{
  $status: RoadmapStatus;
}>`
  border-top: 6px solid ${({ $status }) => `var(--color-status-${$status})`};
  border-radius: 6px;
  height: 233px;

  & a {
    height: 100%;
    flex-direction: column;
  }

  & button,
  label {
    font-size: var(--text-xs);
  }

  @media ${device.md} {
    height: 260px;
  }

  @media ${device.lg} {
    height: 280px;
  }

  @media (max-width: 1023px) {
    & button,
    span,
    p,
    h3 {
      font-size: var(--text-xs);
    }
  }
`;

const RoadmapFeedbackCardContent = styled(FeedbackCardContent)``;

interface RoadmapStatusSectionProps {
  children: ReactNode;
  feedbackList: PlannedFeedback[] | InProgressFeedback[] | LiveFeedback[];
}

/* This component renders a feedback card list based on status: planned, in-Progress, live */
function RoadmapStatusSection({
  children,
  feedbackList,
}: RoadmapStatusSectionProps): React.JSX.Element {
  //TO DO: memoize
  const feedbackCards = feedbackList.map((feedbackItem) => {
    const statusLabel = capitalizeFirstLetter(feedbackItem.status);
    return (
      <li key={feedbackItem.id}>
        <RoadmapFeedbackCard $status={feedbackItem.status}>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
          />
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <StatusIndicator1 $status={feedbackItem.status}>
              <span aria-hidden="true"></span> {statusLabel}
            </StatusIndicator1>

            <RoadmapFeedbackCardContent feedback={feedbackItem} />
            <CommentCount count={feedbackItem.commentCount} />
          </Link>
        </RoadmapFeedbackCard>
      </li>
    );
  });

  return (
    <>
      {children}
      <ul>{feedbackCards}</ul>
    </>
  );
}

export default RoadmapStatusSection;
