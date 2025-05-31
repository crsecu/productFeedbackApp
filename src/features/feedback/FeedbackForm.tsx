import { ReactNode } from "react";
import { FetcherFormProps, FormProps } from "react-router-dom";

import FormField from "./FormField";
import InputField from "./InputField";
import FormFieldError from "./FormFieldError";

import { ActionResult } from "../../types/action.types";
import { CreateFeedbackFormValues } from "../../types/form.types";
import { CATEGORY_OPTIONS } from "../../types/feedback.types";
import styled from "styled-components";
import { CancelButton, PrimaryButton, Textarea } from "../../styles/UIStyles";
import device from "../../styles/breakpoints";
import Tooltip from "../../ui/Tooltip";
import SelectInput from "../../ui/SelectInput";
import { formatCategoryLabel, useFormChangeTracker } from "../../utils/helpers";
import { Option } from "../../types/customSelect";
import { isKeyOf } from "../../utils/TS_helpers";

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

const categoryOptions: Option[] = CATEGORY_OPTIONS.map((category) => ({
  value: category,
  label: formatCategoryLabel(category),
}));

type FormComponentType = React.ForwardRefExoticComponent<
  (FetcherFormProps | FormProps) & React.RefAttributes<HTMLFormElement>
>;

interface FeedbackFormProps<Type extends CreateFeedbackFormValues> {
  FormComponent: FormComponentType; //
  method: "post" | "patch";
  submissionStatus: "idle" | "loading" | "submitting";
  actionResult: ActionResult<unknown>; //
  submitBtnText: string;
  defaultValues: Type;
  children?: (
    onFieldChange: <K extends Extract<keyof Type, string>>(
      fieldName: K,
      fieldValue: Type[K]
    ) => void
  ) => ReactNode;
  buttons?: ReactNode; //for: custom buttons
  actionRoute?: string; //url to which the form will be submitted
  onCancel: (isChanged: boolean) => void;
}

function FeedbackForm<Type extends CreateFeedbackFormValues>({
  children,
  FormComponent,
  method,
  submissionStatus,
  actionResult,
  submitBtnText,
  defaultValues,
  buttons,
  actionRoute,
  onCancel,
}: FeedbackFormProps<Type>): React.JSX.Element {
  /* Track Dirty State */
  const [isFormDirty, handleFieldChange] = useFormChangeTracker(defaultValues);

  const validationErrors = actionResult?.validationErrors ?? null;

  const isSubmitting = submissionStatus === "submitting";

  const tooltipText =
    method === "patch"
      ? "Can't save—form is unchanged."
      : "Fill out the form to enable submit.";

  /* FORM CODE */
  const formOutput = (
    <FormComponent
      method={method}
      onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;
        if (isKeyOf<Type>(defaultValues, name)) {
          handleFieldChange(name, value);
        }
      }}
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
          validationError={validationErrors?.title}
        />
      </FormField>
      <FormField
        inputId="feedbackCategory"
        label="Category"
        description="Choose a category for your feedback"
        inputGuidanceId="feedbackCategoryDesc"
      >
        <SelectInput
          name="category"
          instanceId="feedbackCategory"
          options={categoryOptions}
          defaultValue={categoryOptions.find(
            (option) => option.value === defaultValues.category
          )}
          aria-labelledby="feedbackCategoryDesc"
          classNamePrefix="formSelect"
          onChange={(newVal, actionMeta) => {
            if (actionMeta.name === undefined || !newVal) return;

            if (isKeyOf<Type>(defaultValues, actionMeta.name)) {
              handleFieldChange(
                actionMeta.name,
                newVal.value as Type[typeof actionMeta.name]
              );
            }
          }}
        />
      </FormField>
      {children && children(handleFieldChange)}
      <FormField
        inputId="feedbackDescription"
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
        inputGuidanceId="feedbackDescriptionDesc"
      >
        <Textarea
          $validationErr={!!validationErrors?.description}
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
        {!isFormDirty || isSubmitting ? (
          <Tooltip text={tooltipText}>
            <PrimaryButton
              type="submit"
              disabled={!isFormDirty || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : submitBtnText}
            </PrimaryButton>
          </Tooltip>
        ) : (
          <PrimaryButton type="submit" disabled={!isFormDirty || isSubmitting}>
            {isSubmitting ? "Submitting..." : submitBtnText}
          </PrimaryButton>
        )}
        <CancelButton type="button" onClick={() => onCancel(isFormDirty)}>
          Cancel
        </CancelButton>

        {buttons}
      </ButtonContainer>
    </FormComponent>
  );
  return <>{formOutput}</>;
}

export default FeedbackForm;
