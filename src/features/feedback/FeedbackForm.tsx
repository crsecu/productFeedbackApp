import { ReactNode, useState } from "react";
import { FetcherFormProps, FormProps } from "react-router-dom";
import {
  CreateFeedbackFormValues,
  EditFeedbackFormValues,
  FeedbackActionResult,
} from "../../types/feedback.types";
import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";
import SelectField from "./SelectField";

type FormComponentType = React.ForwardRefExoticComponent<
  (FetcherFormProps | FormProps) & React.RefAttributes<HTMLFormElement>
>;

interface FeedbackFormProps {
  FormComponent: FormComponentType; //
  method: "post" | "patch";
  submissionStatus: "idle" | "loading" | "submitting"; //
  actionResult: FeedbackActionResult; //
  submitBtnText: string;
  defaultValues?: CreateFeedbackFormValues | EditFeedbackFormValues;
  children?: ReactNode; //for: extra fields
  buttons?: ReactNode; //for: custom buttons
  actionRoute?: string; //url to which the form will be submitted
  onCancel: (isDirty: boolean) => void;
}

const feedbackCategories = ["feature", "ui", "ux", "enhancement", "bug"];

function FeedbackForm({
  children,
  FormComponent,
  method,
  submissionStatus,
  actionResult,
  submitBtnText,
  defaultValues = { title: "", description: "", category: "" },
  buttons,
  actionRoute,
  onCancel,
}: FeedbackFormProps): React.JSX.Element {
  /* Track Dirty State */
  const [isDirty, setIsDirty] = useState(false);

  const validationErrors = actionResult?.validationErrors ?? null;

  const isSubmitting = submissionStatus === "submitting";

  function handleFormChange(e: React.ChangeEvent<HTMLFormElement>) {
    const { name, value } = e.target;

    if (defaultValues && name in defaultValues) {
      const key = name as keyof typeof defaultValues;
      if (defaultValues[key] !== value) {
        setIsDirty(true);
      } else {
        console.log("did it change");
        setIsDirty(false);
      }
    }
  }

  /* FORM CODE */
  const formOutput = (
    <FormComponent
      method={method}
      onChange={handleFormChange}
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
          {isSubmitting ? "Submitting..." : submitBtnText}
        </button>
        <button type="button" onClick={() => onCancel(isDirty)}>
          Cancel
        </button>

        {buttons}
      </div>
    </FormComponent>
  );
  return <>{formOutput}</>;
}

export default FeedbackForm;
