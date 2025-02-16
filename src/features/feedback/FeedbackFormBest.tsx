import { Form } from "react-router-dom";
import {
  EditFeedbackFormValues,
  FeedbackFormErrors,
} from "../../types/feedback.types";
import { ReactNode } from "react";
import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";
import SelectField from "./SelectField";

interface FeedbackFormBestProps {
  children?: ReactNode;
  method: "post" | "patch";
  defaultValues?: EditFeedbackFormValues;
  footer: ReactNode;
  errors: FeedbackFormErrors;
  handleChange: (e) => void;
}

const feedbackCategories = ["feature", "ui", "ux", "enhancement", "bug"];

function FeedbackFormBest({
  children,

  method,
  defaultValues,
  footer,
  errors,
  handleChange, //temporary test to check if form val have changed
}: FeedbackFormBestProps): React.JSX.Element {
  return (
    <Form method={method} onChange={handleChange}>
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
        <FormFieldError errorMessage={errors?.title} />
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
        <FormFieldError errorMessage={errors?.description} />
      </FormField>
      <br></br>

      <div>{footer}</div>
    </Form>
  );
}

export default FeedbackFormBest;
