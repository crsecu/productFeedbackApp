import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

import { showModal } from "../../store/slices/modalSlice";
import { SuggestionFeedback } from "../../types/feedback.types";

import BannerNotification from "../../ui/notifications/BannerNotification";
import { useAppDispatch } from "../../types/redux.hooks";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { CreateFeedbackFormValues } from "../../types/form.types";
import { ActionResult } from "../../types/action.types";

import {
  FormPage,
  FormSection,
  GoBackButton,
  TertiaryButton,
} from "../../styles/UIStyles";
import ActionBar from "../../ui/ActionBar";
import createFeedbackIcon from "../../assets/images/createFeedback-icon.svg";

import { H1 } from "../../styles/Typography";

const initialFormState: CreateFeedbackFormValues = {
  title: "",
  description: "",
  category: "feature",
};

function CreateFeedback(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const actionData = useActionData() as ActionResult<SuggestionFeedback>;
  const {
    actionType,
    submissionOutcome,
    isSubmissionSuccessful,
    showForm,
    payload,
  } = getFeedbackFormResponse<SuggestionFeedback>(actionData) || {};

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      navigate(-1);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_addFeedback",
        })
      );
    }
  }

  const notification = (
    <BannerNotification
      notificationType={submissionOutcome}
      actionType={actionType}
    >
      {isSubmissionSuccessful && (
        <>
          <TertiaryButton
            as={Link}
            to={`/feedbackDetail/${payload?.id}`}
            replace
          >
            View Details
          </TertiaryButton>
        </>
      )}
    </BannerNotification>
  );

  return (
    <FormPage>
      <ActionBar isMinimal={true}>
        <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
      </ActionBar>
      {notification}

      {showForm && (
        <FormSection>
          <img src={createFeedbackIcon} alt="" />
          <H1>Create New Feedback</H1>
          <FeedbackForm
            method="post"
            defaultValues={initialFormState}
            actionRoute="."
            onCancel={handleCancel}
            FormComponent={Form}
            submissionStatus={navigation.state}
            actionResult={actionData}
            submitBtnText={"Add Feedback"}
          />
        </FormSection>
      )}
    </FormPage>
  );
}

export default CreateFeedback;
