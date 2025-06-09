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
import { DeleteButton, FormSection } from "../../styles/UIStyles";
import editFeedbackIcon from "../../assets/images/editFeedback-icon.svg";
import { H1 } from "../../styles/Typography";

import styled from "styled-components";
import { Option } from "../../types/customSelect";
import SelectInput from "../../ui/SelectInput";
import FormModal from "./FormModal";

const StyledEditFeedback = styled.div`
  & section:not(.banner-notification) {
    position: static;
    padding: 0;
  }

  & h1 {
    margin-top: 6px;
  }
`;

const statusOptions: Option[] = STATUS_OPTIONS.map((status) => ({
  value: status,
  label: capitalizeFirstLetter(status),
}));

interface EditFeedbackProps {
  editableFeedback: EditFeedbackFormValues;
  onCancel: () => void;
}

function EditFeedback({
  editableFeedback,
  onCancel,
}: EditFeedbackProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { feedbackId } = useParams();
  const fetcher = useFetcher();

  const { actionType, submissionOutcome, showForm } =
    getFeedbackFormResponse<EditFeedbackFormValues>(fetcher?.data) || {};

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      onCancel();
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
    <StyledEditFeedback className="editFeedback">
      <FormModal
        onClose={onCancel}
        hasDynamicHeight={submissionOutcome === "success"}
      >
        {notification}
        {showForm && (
          <FormSection>
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
      </FormModal>
    </StyledEditFeedback>
  );
}

export default EditFeedback;
