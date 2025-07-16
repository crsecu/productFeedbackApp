import styled from "styled-components";
import FormFieldError from "./FormFieldError";
import { FeedbackFormErrors } from "../../types/form.types";
import { ChangeEvent } from "react";

export const StyledInputField = styled.input<{ $validationErr?: boolean }>`
  border: none;
  background-color: var(--color-background);
  border-radius: var(--border-radius-xs);
  padding: 16px;

  height: 48px;
  width: 100%;
  outline: ${(props) =>
    props.$validationErr ? "2px solid var(--color-danger)" : "none"};
  margin-bottom: ${(props) => (props.$validationErr ? "10px" : 0)};
`;

interface InputFieldProps {
  name: string;
  id: string;
  type?: string;
  isRequired?: boolean;
  initialValue?: string;
  describedById?: string;
  validationError?: FeedbackFormErrors;
  minLength?: number;
  // eslint-disable-next-line no-unused-vars
  onOptionChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  id,
  name,
  type = "text",
  isRequired = true,
  initialValue,
  describedById,
  validationError,
  minLength,
  onOptionChange,
}: InputFieldProps): React.JSX.Element {
  const errorMessage = validationError ? validationError[name] : null;

  return (
    <>
      <StyledInputField
        $validationErr={!!errorMessage}
        type={type}
        name={name}
        id={id}
        aria-describedby={describedById}
        defaultValue={initialValue}
        required={isRequired}
        minLength={minLength}
        onChange={onOptionChange}
      ></StyledInputField>

      {errorMessage && <FormFieldError errorMessage={errorMessage} />}
    </>
  );
}

export default InputField;
