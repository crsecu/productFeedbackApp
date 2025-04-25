import styled from "styled-components";
import { labelBox } from "../UIStyles";

export const Card = styled.section`
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  padding: 20px;
  display: flex;
`;

export const CategoryLabel = styled.label`
  ${labelBox}
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body-3);
`;
