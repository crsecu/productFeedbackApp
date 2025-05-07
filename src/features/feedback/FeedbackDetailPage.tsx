import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackCard from "./FeedbackCard";
import CommentCount from "../comments/CommentCount";
import FeedbackCardContent from "./FeedbackCardContent";

import { Feedback } from "../../types/feedback.types";
import EditFeedback from "./EditFeedback";
import { useState, useMemo } from "react";
import {
  GoBackButton,
  PageStyles,
  SecondaryButton,
} from "../../styles/UIStyles";
import styled from "styled-components";
import { UpvoteButtonDynamic } from "../../styles/features/FeedbackStyles";

const StyledFeedbackDetailPage = styled.div`
  ${PageStyles}
  gap: 24px;

  & > section {
    min-height: 40px;
  }
`;

const FeedbackDetailCardContent = styled(FeedbackCardContent)`
  & h3,
  h3 + p {
    display: block;
  }
`;
const EditFeedbackButton = styled(SecondaryButton)<{ $hideButton?: boolean }>`
  margin-left: auto;
  ${(props) => props.$hideButton && "display: none"};
`;

function FeedbackDetailPage(): React.JSX.Element {
  const navigate = useNavigate();
  const feedback = useLoaderData() as Feedback;

  const [showEditFeedback, setShowEditFeedback] = useState(false);

  const { id, upvotes, title, description, category, status } = feedback;

  const editableFeedbackFields = useMemo(() => {
    return {
      title,
      description,
      category,
      status,
    };
  }, [category, description, status, title]);

  return (
    <StyledFeedbackDetailPage>
      <ActionBar isMinimal={true}>
        <GoBackButton
          onClick={() => {
            /* TO DO: Find a way to reset unwanted search params that carry out from feedbackBoard */
            navigate(-1);
          }}
        >
          Go Back
        </GoBackButton>

        <EditFeedbackButton
          onClick={() => setShowEditFeedback(true)}
          $hideButton={showEditFeedback}
        >
          Edit Feedback
        </EditFeedbackButton>
      </ActionBar>

      {showEditFeedback && (
        <EditFeedback
          editableFeedback={editableFeedbackFields}
          setShowEditFeedback={setShowEditFeedback}
        />
      )}

      <FeedbackCard>
        <UpvoteButtonDynamic feedbackId={id} initialUpvoteCount={upvotes} />
        <div>
          <FeedbackDetailCardContent feedback={feedback} />
          <CommentCount />
        </div>
      </FeedbackCard>

      <Outlet />
    </StyledFeedbackDetailPage>
  );
}

export default FeedbackDetailPage;
