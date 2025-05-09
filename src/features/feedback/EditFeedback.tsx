import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { useFetcher, useParams } from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import BannerNotification from "../../ui/BannerNotification";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { EditFeedbackFormValues } from "../../types/form.types";
import { STATUS_OPTIONS } from "../../types/feedback.types";
import { DeleteButton, FormSection } from "../../styles/UIStyles";
import editFeedbackIcon from "../../assets/images/editFeedback-icon.svg";
import { H1 } from "../../styles/Typography";
import { IoCloseCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledEditFeedback = styled.div`
  position: absolute;

  max-width: 85%;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;

  & section {
    position: relative;
  }

  @media ${device.sm} {
  }

  @media ${device.lg} {
    max-width: 65%;
  }

  @media ${device.xxl} {
    max-width: 45%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: -6px;
  top: -8px;
  border: none;
  font-size: 28px;
  background: none;
  color: var(--color-tertiary);

  &:hover svg path {
    fill: var(--color-tertiary-hover);
  }

  &:active svg path {
    transform: scale(0.98);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

interface EditFeedbackProps {
  editableFeedback: EditFeedbackFormValues;
  setShowEditFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditFeedback({
  editableFeedback,
  setShowEditFeedback,
}: EditFeedbackProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { feedbackId } = useParams();
  const fetcher = useFetcher();
  console.log("Edit Feedback");
  const { actionType, submissionOutcome, isSubmissionSuccessful, showForm } =
    getFeedbackFormResponse<EditFeedbackFormValues>(fetcher?.data) || {};

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      setShowEditFeedback(false);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
          confirmPayload: feedbackId,
        })
      );
    }
  }

  const notification = (
    <BannerNotification
      actionType={actionType}
      notificationType={submissionOutcome}
    />
  );
  return (
    <StyledEditFeedback>
      {notification}
      {showForm && (
        <FormSection>
          <CloseButton onClick={() => setShowEditFeedback(false)}>
            <IoCloseCircleSharp />
          </CloseButton>
          <img src={editFeedbackIcon} alt="" />
          <H1>Editing "{editableFeedback.title}"</H1>

          <FeedbackForm
            method="patch"
            defaultValues={editableFeedback}
            buttons={
              <>
                <DeleteButton
                  type="button"
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: "delete_feedback",
                        confirmPayload: feedbackId,
                      })
                    );
                  }}
                >
                  Delete
                </DeleteButton>
              </>
            }
            actionRoute="editFeedback"
            onCancel={handleCancel}
            FormComponent={fetcher.Form}
            submissionStatus={fetcher.state}
            actionResult={fetcher.data}
            submitBtnText={"Save Changes"}
          >
            <FormField
              inputId="feedbackStatus"
              label="Update Status"
              description="Change feature state"
              inputGuidanceId="feedbackStatusDesc"
            >
              <SelectField
                name="status"
                id="feedbackStatus"
                options={STATUS_OPTIONS}
                describedById="feedbackStatusDesc"
                initialValue={editableFeedback?.status}
              />
            </FormField>
          </FeedbackForm>
        </FormSection>
      )}
    </StyledEditFeedback>
  );
}

export default EditFeedback;
