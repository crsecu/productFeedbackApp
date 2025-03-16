import { ReactNode, useState } from "react";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigation,
} from "react-router-dom";
import {
  CreateFeedbackFormValues,
  EditFeedbackFormValues,
  FeedbackActionResult,
} from "../../types/feedback.types";
import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";
import SelectField from "./SelectField";
import { handleFormChange } from "../../utils/helpers";
import BannerNotification from "../../ui/BannerNotification";

interface FeedbackFormProps {
  method: "post" | "patch";
  defaultValues?: CreateFeedbackFormValues | EditFeedbackFormValues;
  children?: ReactNode; //for: extra fields
  buttons?: ReactNode; //for: custom buttons
  actionRoute?: string; //url to which the form will be submitted
  onCancel: (isDirty: boolean) => void;
}

const feedbackCategories = ["feature", "ui", "ux", "enhancement", "bug"];

function FeedbackForm({
  children,
  method,
  defaultValues = { title: "", description: "", category: "" },
  buttons,
  actionRoute,
  onCancel,
}: FeedbackFormProps): React.JSX.Element {
  const fetcher = useFetcher();
  const fetcherData =
    fetcher?.data as FeedbackActionResult; /* editFeedback action res*/
  const actionData =
    useActionData() as FeedbackActionResult; /* addFeedback action res*/
  const navigation = useNavigation();

  const isEditing = method === "patch";
  const FormComponent = isEditing ? fetcher.Form : Form;

  /* Track Dirty State */
  const [isDirty, setIsDirty] = useState(false);

  const actionResponse = isEditing ? fetcherData : actionData;
  const navigationState = isEditing ? fetcher.state : navigation.state;

  const validationErrors = actionResponse?.validationErrors ?? null;
  const isSubmissionSuccessful = actionResponse?.success ?? null; //TO DO: defaulting to null may not be necessary - check later
  const isSubmitting = navigationState === "submitting";

  const successMessage = isEditing
    ? "editFeedback_success"
    : "createFeedback_success";

  const failureMessage = isEditing
    ? "editFeedback_failed"
    : "createFeedback_failed";

  //notification
  const notification = (
    <BannerNotification
      notificationType={
        isSubmissionSuccessful ? successMessage : failureMessage
      }
    ></BannerNotification>
  );

  function handleFormChange1(e: React.ChangeEvent<HTMLFormElement>) {
    const { name, value } = e.target;
    if (defaultValues && name in defaultValues) {
      const key = name as keyof typeof defaultValues;
      if (defaultValues[key] !== value) {
        setIsDirty(true);
      }
    }
  }

  /* FORM CODE */
  const formOutput = (
    <FormComponent
      method={method}
      onChange={handleFormChange1}
      action={actionRoute}
    >
      <FormField
        inputId="feedbackTitle"
        label="Feedback Title"
        description="Add a short, descriptive headline"
        inputGuidanceId="feedbackTitleDesc"
      >
        <InputField
          name="title"
          id="feedbackTitle"
          type="text"
          describedById="feedbackTitleDesc"
          initialValue={defaultValues?.title}
        />
        {validationErrors?.title && (
          <FormFieldError errorMessage={validationErrors.title} />
        )}
      </FormField>
      <br></br>

      <FormField
        inputId="feedbackCategory"
        label="Category"
        description="Choose a category for your feedback"
        inputGuidanceId="feedbackCategoryDesc"
      >
        <SelectField
          name="category"
          id="feedbackCategory"
          options={feedbackCategories}
          describedById="feedbackCategoryDesc"
          initialValue={defaultValues?.category}
        />
      </FormField>

      {children}

      <FormField
        inputId="feedbackDescription"
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
        inputGuidanceId="feedbackDescriptionDesc"
      >
        <textarea
          name="description"
          id="feedbackDescription"
          aria-describedby="feedbackDescriptionDesc"
          maxLength={250}
          defaultValue={defaultValues?.description}
          required
        />
        {validationErrors?.description && (
          <FormFieldError errorMessage={validationErrors.description} />
        )}
      </FormField>
      <br></br>

      <div>
        <button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting
            ? "Submitting..."
            : isEditing
            ? "Update Feedback"
            : "Submit Feedback"}
        </button>
        <button type="button" onClick={() => onCancel(isDirty)}>
          Cancel
        </button>

        {buttons}
      </div>
    </FormComponent>
  );
  return (
    <>
      {isSubmissionSuccessful !== null && notification}
      {formOutput}
    </>
  );
}

export default FeedbackForm;
