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
import { createPortal } from "react-dom";

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

  const rootEl = document.getElementById("root")!;

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

      {showEditFeedback &&
        createPortal(
          <EditFeedback
            editableFeedback={editableFeedbackFields}
            setShowEditFeedback={setShowEditFeedback}
          />,
          rootEl
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
