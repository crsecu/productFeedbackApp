/* Reusable UI components such as buttons, links etc */

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import device from "./breakpoints";

/* White backdrop */
export const panelStyles = css`
  background-color: var(--color-surface);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  border-radius: var(--border-radius-sm);
  padding: 22px;
`;

export const linkStyles = css`
  color: var(--color-text-accent);
  font-size: 0.813rem;
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  align-self: center;
`;

//FOCUS styles
export const focusStyle = css`
  &:focus-visible {
    outline: 1px solid #5fbab0;
    box-shadow: inset 0 0 2px 1px #00524b, 0 0 12px 1px #5fbab0;
  }
`;

export const LinkStyleDisabled = styled.p`
  ${linkStyles}
  opacity: 0.25;
  cursor: not-allowed;
`;

export const StyledLink = styled(Link)`
  ${linkStyles}

  border-radius: 8px;
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
export const buttonStyles = css`
  font-size: var(--font-size-body-3);
  font-weight: var(--font-weight-bold);
  background-color: #cdd2ee;
  color: var(--color-text-soft-accent);
  border: none;
  padding: 10px 16px 10px 14px;
  border-radius: 10px;
`;

export const BaseButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}

  background-color: ${(props) => props.$bgColor};

  &:hover {
    background-color: ${(props) => props.$bgColorHover};
  }

  &:enabled:active {
    transform: scale(0.98);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: var(--color-background-disabled);
    color: var(--color-text-disabled);
  }

  ${focusStyle}
`;

export const PrimaryButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-primary)",
  $bgColorHover: "var(--color-primary-hover)",
}))``;

export const SecondaryButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-secondary)",
  $bgColorHover: "var(--color-secondary-hover)",
}))``;

export const TertiaryButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-tertiary)",
  $bgColorHover: "var(--color-tertiary-hover)",
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

  ${focusStyle}
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

export const CancelButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-tertiary)",
  $bgColorHover: "var(--color-tertiary-hover)",
}))``;

export const DeleteButton = styled(BaseButton).attrs(() => ({
  $bgColor: "var(--color-danger)",
  $bgColorHover: "var(--color-danger-hover)",
}))``;

export const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 18px;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  background: none;
  color: #6b7280;
  z-index: 99;

  &:hover svg path {
    fill: var(--color-tertiary-hover);
  }

  &:active svg path {
    transform: scale(0.98);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

/* Box with rounded corners used for: category labels, upvote button */
export const labelBox = css`
  background-color: var(--color-surface-accent);
  color: var(--color-text-accent); //
  border-radius: 10px;
  padding: 5px 16px;
`;

/* Page Level styles */
export const PageStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;

  @media ${device.sm} {
    width: 92vw;
  }

  @media ${device.xl} {
    width: 88vw;
  }

  @media ${device.xxl} {
    width: 70vw;
  }
`;

export const FormPage = styled.div`
  ${PageStyles}
  padding-top: 28px;
  gap: 44px;
  height: initial;
  width: 90vw;

  @media ${device.sm} {
    width: 85vw;
  }

  @media ${device.md} {
    width: 75vw;
  }

  @media ${device.lg} {
    width: 65vw;
  }
  @media ${device.xl} {
    width: 55vw;
  }

  @media ${device.xxl} {
    width: 40vw;
  }
`;

export const FormSection = styled.section`
  ${panelStyles}
  position: relative;

  flex: 1;

  & img {
    position: absolute;
    top: -16px;
  }

  & h1 {
    margin: 18px 0;
  }

  @media ${device.sm} {
    padding: 36px;
  }
`;

export const Textarea = styled.textarea<{
  $height?: number;
  $validationErr?: boolean;
}>`
  border: none;
  background-color: var(--color-background);
  width: 100%;
  height: ${(props) => (props.$height ? props.$height : 80)}px;
  margin: 16px 0 10px;
  padding: 16px;
  border-radius: var(--border-radius-xs);
  outline: ${(props) =>
    props.$validationErr ? "2px solid var(--color-danger)" : "none"};
  margin-bottom: ${(props) => props.$validationErr && "5px"};

  resize: none;
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
