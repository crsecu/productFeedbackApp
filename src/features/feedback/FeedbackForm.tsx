import { ReactNode } from "react";
import { Form } from "react-router-dom";
import {
  CreateFeedbackFormValues,
  EditFeedbackFormValues,
  FeedbackFormErrors,
} from "../../types/feedback.types";
import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";
import SelectField from "./SelectField";
import { handleFormChange } from "../../utils/helpers";

interface FeedbackFormProps {
  children?: ReactNode;

  method: "post" | "patch";
  defaultValues: CreateFeedbackFormValues | EditFeedbackFormValues;
  footer: ReactNode;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FeedbackFormErrors | null;
  actionRoute?: string;
}

const feedbackCategories = ["feature", "ui", "ux", "enhancement", "bug"];

function FeedbackForm({
  children,
  method,
  defaultValues,
  footer,
  isDirty,
  setIsDirty,
  errors,
  actionRoute,
}: FeedbackFormProps): React.JSX.Element {
  return (
    <Form
      method={method}
      onChange={(e) =>
        handleFormChange(e.currentTarget, defaultValues, isDirty, setIsDirty)
      }
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
          initialValue={defaultValues.title}
        />
        {errors?.title && <FormFieldError errorMessage={errors.title} />}
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
          initialValue={defaultValues.category}
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
          defaultValue={defaultValues.description}
          required
        />
        {errors?.description && (
          <FormFieldError errorMessage={errors.description} />
        )}
      </FormField>
      <br></br>

      <div>{footer}</div>
    </Form>
  );
}

export default FeedbackForm;
