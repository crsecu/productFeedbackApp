import { useNavigate } from "react-router-dom";
import { deleteFeedback } from "../../services/apiFeedback";
import { hideModal } from "../../store/slices/modalSlice";
import { showToastNotification } from "../../store/slices/toastNotificationSlice";
import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import assert from "../../utils/TS_helpers";
import styled from "styled-components";
import {
  buttonStyles,
  Overlay,
  panelStyles,
  TertiaryButton,
} from "../../styles/UIStyles";
import { modalMessages } from "./modalConfig";
import { FocusTrap } from "focus-trap-react";
import { closeEditFeedback } from "../../store/slices/feedbackDetailSlice";
import { ensureValidSession } from "../../services/apiAuth";

const StyledGlobalModal = styled.div`
  ${panelStyles}

  border-radius: var(--border-radius-xs);
  position: fixed;
  inset: 0px;
  width: fit-content;
  max-width: 310px;
  height: fit-content;
  margin: auto;
  padding: 20px;
  z-index: 4;

  & p {
    padding: 0 10px;
    text-align: center;
  }
  & div {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    margin-top: 18px;
  }

  & button {
    min-width: 115px;
    padding: 7px 14px;
  }
`;

const ModalTitle = styled.p`
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: 6px;
  text-align: center;
`;

const CancelButton = styled.button`
  ${buttonStyles}
  color: var(--color-primary);
  background: none;
  border: 2px solid;
`;

const OverlayDark = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.9);
`;

function GlobalModal(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, modalType, confirmPayload } = useAppSelector(
    (state) => state.modal
  );

  if (!isOpen || !modalType) return null;

  const modalData = modalMessages[modalType];
  const { title, description, decisionButton, wayoutButton } = modalData || {};

  const handleConfirm = async () => {
    if (modalType === "delete_feedback") {
      const authSession = await ensureValidSession();
      if (!authSession) return navigate("/");

      try {
        assert(confirmPayload);
        await deleteFeedback(authSession.accessToken, confirmPayload);

        navigate("/app/feedbackBoard", { replace: true }); //this must go to previous page which could be roadmap as well

        dispatch(showToastNotification({ key: "deleteFeedback_success" }));
      } catch (err) {
        console.error("Failed to delete feedback:", err);
        dispatch(
          showToastNotification({
            key: "deleteFeedback_error",
          })
        );
      }
    }

    if (modalType === "cancel_addFeedback") {
      navigate(-1);
    }

    if (modalType === "cancel_editFeedback") {
      dispatch(closeEditFeedback());
    }

    if (modalType) dispatch(hideModal());
  };

  return (
    <>
      <OverlayDark />
      <FocusTrap>
        <StyledGlobalModal>
          {isOpen && <span className="no-scroll-modal"></span>}

          <ModalTitle>{title}</ModalTitle>
          <p>{description}</p>
          <div>
            <TertiaryButton onClick={handleConfirm}>
              {decisionButton}
            </TertiaryButton>
            <CancelButton onClick={() => dispatch(hideModal())}>
              {wayoutButton}
            </CancelButton>
          </div>
        </StyledGlobalModal>
      </FocusTrap>
    </>
  );
}

export default GlobalModal;
