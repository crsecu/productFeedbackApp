import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";

import { useFetcher, useParams } from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import BannerNotification from "../../ui/notifications/BannerNotification";
import {
  capitalizeFirstLetter,
  getFeedbackFormResponse,
} from "../../utils/helpers";
import { EditFeedbackFormValues } from "../../types/form.types";
import { STATUS_OPTIONS } from "../../types/feedback.types";
import { CloseButton, DeleteButton, FormSection } from "../../styles/UIStyles";
import editFeedbackIcon from "../../assets/images/editFeedback-icon.svg";
import { H1 } from "../../styles/Typography";
import { IoCloseCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import device from "../../styles/breakpoints";
import { Option } from "../../types/customSelect";
import SelectInput from "../../ui/SelectInput";

const StyledEditFeedback = styled.div`
  position: absolute;

  max-width: 92%;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 28px;

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

const statusOptions: Option[] = STATUS_OPTIONS.map((status) => ({
  value: status,
  label: capitalizeFirstLetter(status),
}));

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
      onClose={() => setShowEditFeedback(false)}
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
            {(onFieldChange) => (
              <FormField
                inputId="feedbackStatus"
                label="Update Status"
                description="Change feature state"
                inputGuidanceId="feedbackStatusDesc"
              >
                <SelectInput
                  name="status"
                  instanceId="feedbackStatus"
                  options={statusOptions}
                  defaultValue={statusOptions.find(
                    (option) => option.value === editableFeedback.status
                  )}
                  aria-labelledby="feedbackStatusDesc"
                  classNamePrefix="formSelect"
                  onChange={(newVal, actionMeta) => {
                    if (actionMeta.name === undefined || !newVal) return;
                    onFieldChange(actionMeta.name, newVal.value);
                  }}
                />
              </FormField>
            )}
          </FeedbackForm>
        </FormSection>
      )}
    </StyledEditFeedback>
  );
}

export default EditFeedback;
