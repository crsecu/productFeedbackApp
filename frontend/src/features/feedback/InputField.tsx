import styled from "styled-components";
import FormFieldError from "./FormFieldError";

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
  validationError?: string;
  minLength?: number;
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
}: InputFieldProps): React.JSX.Element {
  return (
    <>
      <StyledInputField
        $validationErr={!!validationError}
        type={type}
        name={name}
        id={id}
        aria-describedby={describedById}
        defaultValue={initialValue}
        required={isRequired}
        minLength={minLength}
      ></StyledInputField>

      {validationError && <FormFieldError errorMessage={validationError} />}
    </>
  );
}

export default InputField;
