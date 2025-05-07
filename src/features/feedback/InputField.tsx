import styled from "styled-components";

const StyledInputField = styled.input`
  border: none;
  background-color: var(--color-background);
  border-radius: var(--border-radius-xs);
  padding: 16px;

  height: 48px;
  width: 100%;
`;

interface InputFieldProps {
  name: string;
  id: string;
  type?: string; //
  isRequired?: boolean;
  initialValue?: string;
  describedById?: string;
}

function InputField({
  id,
  name,
  type = "text",
  isRequired = true,
  initialValue,
  describedById,
}: InputFieldProps): React.JSX.Element {
  return (
    <StyledInputField
      type={type}
      name={name}
      id={id}
      aria-describedby={describedById}
      defaultValue={initialValue}
      required={isRequired}
    ></StyledInputField>
  );
}

export default InputField;
