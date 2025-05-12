import { ReactNode, useState } from "react";
import { FetcherFormProps, FormProps } from "react-router-dom";

import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";
import SelectField from "./SelectField";
import { ActionResult } from "../../types/action.types";
import {
  CreateFeedbackFormValues,
  EditFeedbackFormValues,
} from "../../types/form.types";
import { CATEGORY_OPTIONS } from "../../types/feedback.types";
import styled from "styled-components";
import { CancelButton, PrimaryButton, Textarea } from "../../styles/UIStyles";
import device from "../../styles/breakpoints";
import Tooltip from "../../ui/Tooltip";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media ${device.sm} {
    flex-direction: row-reverse;

    & button:nth-child(3) {
      margin-right: auto;
    }
  }
`;

type FormComponentType = React.ForwardRefExoticComponent<
  (FetcherFormProps | FormProps) & React.RefAttributes<HTMLFormElement>
>;

interface FeedbackFormProps {
  FormComponent: FormComponentType; //
  method: "post" | "patch";
  submissionStatus: "idle" | "loading" | "submitting";
  actionResult: ActionResult<unknown>; //

  submitBtnText: string;
  defaultValues?: CreateFeedbackFormValues | EditFeedbackFormValues;
  children?: ReactNode; //for: extra fields
  buttons?: ReactNode; //for: custom buttons
  actionRoute?: string; //url to which the form will be submitted
  onCancel: (isDirty: boolean) => void;
}

function FeedbackForm({
  children,
  FormComponent,
  method,
  submissionStatus,
  actionResult,
  submitBtnText,
  defaultValues = { title: "", description: "", category: "feature" },
  buttons,
  actionRoute,
  onCancel,
}: FeedbackFormProps): React.JSX.Element {
  /* Track Dirty State */
  const [isDirty, setIsDirty] = useState(false);

  const validationErrors = actionResult?.validationErrors ?? null;

  const isSubmitting = submissionStatus === "submitting";
  const tooltipText =
    method === "patch"
      ? "Can’t save—form is unchanged."
      : "Fill out the form to enable submit.";

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

      <FormField
        inputId="feedbackCategory"
        label="Category"
        description="Choose a category for your feedback"
        inputGuidanceId="feedbackCategoryDesc"
      >
        <SelectField
          name="category"
          id="feedbackCategory"
          options={CATEGORY_OPTIONS}
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
        <Textarea
          $height={120}
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

      <ButtonContainer>
        {!isDirty || isSubmitting ? (
          <Tooltip text={tooltipText}>
            <PrimaryButton type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? "Submitting..." : submitBtnText}
            </PrimaryButton>
          </Tooltip>
        ) : (
          <PrimaryButton type="submit" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? "Submitting..." : submitBtnText}
          </PrimaryButton>
        )}
        {/* <PrimaryButton type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Submitting..." : submitBtnText}
        </PrimaryButton> */}
        <CancelButton type="button" onClick={() => onCancel(isDirty)}>
          Cancel
        </CancelButton>

        {buttons}
      </ButtonContainer>
    </FormComponent>
  );
  return <>{formOutput}</>;
}

export default FeedbackForm;
