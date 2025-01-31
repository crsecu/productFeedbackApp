import { ReactNode } from "react";

interface FormField {
  children: ReactNode;
  inputId: string;
  label: string;
  description: string; // "Add a short, descriptive headline"
  inputGuidanceId: string;
}

function FormField({
  children,
  inputId,
  label,
  description,
  inputGuidanceId,
}: FormField): React.JSX.Element {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <span id={inputGuidanceId}>{description}</span>
      {children}
    </>
  );
}

export default FormField;
