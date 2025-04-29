import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackCard from "./FeedbackCard";
import CommentCount from "../comments/CommentCount";
import FeedbackCardContent from "./FeedbackCardContent";
import UpvoteButton from "./UpvoteButton";

import { Feedback } from "../../types/feedback.types";
import EditFeedback from "./EditFeedback";
import { useState, useMemo } from "react";
import { GoBackButton, SecondaryButton } from "../../styles/UIStyles";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackDetailPage = styled.div`
  //TO DO: create reusable Page styling

  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  padding: 28px 24px;

  @media ${device.sm} {
    padding: 28px 24px;
  }

  @media ${device.md} {
    padding: 28px 34px;
  }

  @media ${device.lg} {
    flex-direction: row;
    gap: 30px;
  }

  @media ${device.xl} {
    padding: 28px 6vw;
  }

  @media ${device.xxl} {
    padding: 28px 10vw;
  }
`;

const EditFeedbackButton = styled(SecondaryButton)`
  margin-left: auto;
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

        <EditFeedbackButton onClick={() => setShowEditFeedback(true)}>
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
        <UpvoteButton feedbackId={id} initialUpvoteCount={upvotes} />
        <FeedbackCardContent feedback={feedback}>
          <CommentCount />
        </FeedbackCardContent>
      </FeedbackCard>

      <Outlet />
    </StyledFeedbackDetailPage>
  );
}

export default FeedbackDetailPage;
