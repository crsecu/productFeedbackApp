/* Reusable UI components such as buttons, links etc */

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import device from "./breakpoints";

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

export const SecondaryButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-secondary)",
  $bgColorHover: "var(--color-secondary-hover)",
}))``;

/* Link Buttons */
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

export const GoBackBtnStyles = css`
  ${buttonStyles}

  padding: 0;
  padding-left: 18px;

  background: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 7 10' fill='none'%3E%3Cpath d='M6 9L2 5L6 1' stroke='%234661E6' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left bottom 4px;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const GoBackButton = styled.button`
  ${GoBackBtnStyles}
  color: var(--color-text-muted);
`;

export const GoBackLinkButton = styled(Link)`
  ${GoBackBtnStyles}

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 7 10' fill='none'%3E%3Cpath d='M6 9L2 5L6 1' stroke='%23CDD2EE' stroke-width='2'/%3E%3C/svg%3E");
`;

export const ReplyButton = styled.button`
  ${buttonStyles}

  color: var(--color-text-accent);
  padding: 0;
  background: none;
  font-weight: var(--font-weight-semibold);
`;

/* Box with rounded corners used for: category labels, upvote button */
export const labelBox = css`
  background-color: var(--color-surface-accent);
  color: var(--color-text-accent); //
  border-radius: 10px;
  padding: 5px 16px; //
`;

/* Page Level styles */
export const PageStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 28px 24px;
  @media ${device.sm} {
    padding: 28px 24px;
  }

  @media ${device.md} {
    padding: 28px 34px;
  }

  @media ${device.xl} {
    padding: 28px 6vw;
  }

  @media ${device.xxl} {
    padding: 28px 10vw;
  }
`;
