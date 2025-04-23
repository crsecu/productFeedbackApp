import styled, { css } from "styled-components";

// Base style should be MOBILE
/* export const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }
`; */

export const H1 = styled.h1<{ $textLight?: boolean }>`
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-h1);
  letter-spacing: var(--letter-spacing-h1);
  ${(props) =>
    props.$textLight &&
    css`
      color: var(--color-text-light);
    `}
`;

export const H2 = styled.h2`
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-h2);
  letter-spacing: var(--letter-spacing-h2);
`;

export const H3 = styled.h3`
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-h3);
  letter-spacing: var(--letter-spacing-h3);
`;

export const H4 = styled.h4`
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-h4);
  letter-spacing: var(--letter-spacing-h4);
`;
