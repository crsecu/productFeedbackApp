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
import { StyledFeedbackCard } from "../feedback/FeedbackCard";
import { RoadmapStatus } from "../../types/roadmap.types";

const RoadmapFeedbackCard = styled(StyledFeedbackCard)<{
  $status: RoadmapStatus;
}>`
  border-top: 6px solid ${({ $status }) => `var(--color-status-${$status})`};
  border-radius: 6px;
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
            <FeedbackCardContent feedback={feedbackItem} />
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
