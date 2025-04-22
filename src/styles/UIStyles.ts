/* Reusable UI components such as buttons, links etc */

import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  font-size: 0.813rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-accent);
  text-decoration: underline;
  align-self: center;
`;

export const StrongText = styled.span`
  font-weight: var(--font-weight-bold);
`;
