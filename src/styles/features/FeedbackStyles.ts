import styled, { css } from "styled-components";
import { labelBox } from "../UIStyles";

export const panelStyles = css`
  background-color: var(--color-surface);
  border-radius: var(--border-radius-sm);
  padding: 22px;
`;

export const Card = styled.section`
  ${panelStyles}
  display: flex;
  padding: 20px;
`;

export const CategoryLabel = styled.label`
  ${labelBox}
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body-3);
`;
