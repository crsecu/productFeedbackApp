/* Reusable UI components such as buttons, links etc */

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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

/* BUTTONS */
type ButtonStyleProps = {
  $bgColor?: string;
  $bgColorHover?: string;
};

/* Regular Button */
const buttonStyles = css`
  font-size: var(--font-size-body-3);
  font-weight: var(--font-weight-bold);
  background-color: #cdd2ee;
  color: var(--color-text-soft-accent);
  border: none;
  padding: 10px 16px;
  border-radius: 11px;
`;

export const BaseButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}

  background-color: ${(props) => props.$bgColor};

  &:hover {
    background-color: ${(props) => props.$bgColorHover};
  }

  &:active {
    transform: scale(0.98);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const PrimaryButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-primary)",
  $bgColorHover: "var(--color-primary-hover)",
}))``;

/* Link Button */
export const BaseLinkButton = styled(Link)<ButtonStyleProps>`
  ${buttonStyles}

  background-color: ${(props) => props.$bgColor};

  &:hover {
    background-color: ${(props) => props.$bgColorHover};
  }

  &:active {
    transform: scale(0.98);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const PrimaryLinkButton = styled(BaseLinkButton).attrs(() => ({
  $bgColor: "var(--color-primary)",
  $bgColorHover: "var(--color-primary-hover)",
}))``;

/* Box with rounded corners used for: category labels, upvote button */
export const labelBox = css`
  background-color: var(--color-surface-accent);
  color: var(--color-text-accent); //
  border-radius: 10px;
  padding: 5px 16px; //
`;
