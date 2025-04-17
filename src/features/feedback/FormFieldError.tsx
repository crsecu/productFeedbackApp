interface FormFieldErrorProps {
  errorMessage: string;
}
function FormFieldError({
  errorMessage,
}: FormFieldErrorProps): React.JSX.Element {
  return <p>{errorMessage}</p>;
}

export default FormFieldError;
