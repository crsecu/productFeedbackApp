import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackCard from "./FeedbackCard";
import CommentCount from "../comments/CommentCount";
import FeedbackCardContent from "./FeedbackCardContent";

import { Feedback } from "../../types/feedback.types";
import EditFeedback from "./EditFeedback";
import { useMemo } from "react";
import {
  GoBackButton,
  PageStyles,
  SecondaryButton,
} from "../../styles/UIStyles";
import styled from "styled-components";
import { UpvoteButtonDynamic } from "../../styles/features/FeedbackStyles";
import { createPortal } from "react-dom";
import device from "../../styles/breakpoints";

import ClassicModal from "./FormModal";
import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import {
  closeEditFeedback,
  openEditFeedback,
} from "../../store/slices/feedbackDetailSlice";

const StyledFeedbackDetailPage = styled.div`
  ${PageStyles}
  gap: 16px;
  padding-top: 24px;
  width: 92vw;

  & > section {
    min-height: 40px;
  }

  @media ${device.md} {
    padding-top: 0;
  }
`;

const FeedbackDetailCardContent = styled(FeedbackCardContent)`
  & h3,
  h3 + p {
    display: block;
  }
`;
const EditFeedbackButton = styled(SecondaryButton)`
  margin-left: auto;
`;

function FeedbackDetailPage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const feedback = useLoaderData() as Feedback;
  const { isEditing } = useAppSelector((state) => state.feedbackDetail);

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
      {isEditing &&
        createPortal(
          <ClassicModal onClose={() => dispatch(closeEditFeedback())}>
            <EditFeedback
              editableFeedback={editableFeedbackFields}
              onCancel={() => dispatch(closeEditFeedback())}
            />
          </ClassicModal>,
          rootEl
        )}

      <>
        <ActionBar isMinimal={true}>
          <GoBackButton
            onClick={() => {
              /* TO DO: Find a way to reset unwanted search params that carry out from feedbackBoard */
              navigate(-1);
            }}
          >
            Go Back
          </GoBackButton>

          <EditFeedbackButton onClick={() => dispatch(openEditFeedback())}>
            Edit Feedback
          </EditFeedbackButton>
        </ActionBar>
        <FeedbackCard>
          <UpvoteButtonDynamic feedbackId={id} initialUpvoteCount={upvotes} />
          <div>
            <FeedbackDetailCardContent feedback={feedback} />
            <CommentCount />
          </div>
        </FeedbackCard>

        <Outlet />
      </>
    </StyledFeedbackDetailPage>
  );
}

export default FeedbackDetailPage;
