import styled from "styled-components";

const StyledFormFieldError = styled.p`
  color: var(--color-danger);
  font-size: var(--text-sm);
`;

interface FormFieldErrorProps {
  errorMessage: string;
}
function FormFieldError({
  errorMessage,
}: FormFieldErrorProps): React.JSX.Element {
  return <StyledFormFieldError>{errorMessage}</StyledFormFieldError>;
}

export default FormFieldError;
