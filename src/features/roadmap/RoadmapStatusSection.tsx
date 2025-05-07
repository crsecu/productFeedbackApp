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
    & span,
    p,
    h3 {
      font-size: var(--text-xs);
    }
  }
`;

const RoadmapFeedbackCardContent = styled(FeedbackCardContent)`
  max-width: ;
`;

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
    return (
      <li key={feedbackItem.id}>
        <RoadmapFeedbackCard $status={feedbackItem.status}>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
          />
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
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
