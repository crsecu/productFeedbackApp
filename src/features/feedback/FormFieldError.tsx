interface FormFieldErrorProps {
  errorMessage: string;
}
function FormFieldError({
  errorMessage,
}: FormFieldErrorProps): React.JSX.Element {
  return <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>;
}

export default FormFieldError;
