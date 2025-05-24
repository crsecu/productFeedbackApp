import { ReactNode } from "react";
import styled from "styled-components";

const StyledFormField = styled.div`
  margin-bottom: 20px;
  & label {
    display: block;
    font-weight: var(--font-weight-bold);
    letter-spacing: -0.18px;
    margin-bottom: 2px;
  }

  & span {
    color: var(--color-text-muted);
    display: block;
  }

  & input,
  select {
    margin-top: 16px;
  }

  & .formSelect__control {
    margin-top: 16px;
    padding: 6px 16px;
  }

  & .formSelect__control path {
    stroke: var(--color-secondary);
  }

  & .formSelect__dropdown-indicator {
    margin-left: auto;
  }
`;

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
    <StyledFormField>
      <label htmlFor={inputId}>{label}</label>
      <span id={inputGuidanceId}>{description}</span>
      {children}
    </StyledFormField>
  );
}

export default FormField;
