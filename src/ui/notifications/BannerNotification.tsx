import { ReactNode } from "react";
import { ActionType, SubmissionOutcome } from "../../types/action.types.ts";
import styled, { css } from "styled-components";
import { H1 } from "../../styles/Typography.ts";
import { panelStyles } from "../../styles/UIStyles.ts";
import { IoCloseSharp } from "react-icons/io5";

import { buildNotificationMessage } from "./notificationMessages.tsx";
interface StyledBannerProps {
  $notificationType: SubmissionOutcome;
  $themeColor: string;
}

const StyledBannerNotification = styled.section<StyledBannerProps>`
  ${panelStyles}
  position: relative;
  z-index: 1;
  margin-bottom: 35px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${(props) => props.$themeColor};
    border-radius: var(--border-radius-sm);
    opacity: 0.2;
    z-index: -1;
  }

  & svg {
    margin-bottom: 6px;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  & a {
    display: inline-block;
    padding: 8px 12px;
    margin-top: 12px;
  }

  & button:first-child {
    border: none;
    background: none;
    font-size: 22px;

    position: absolute;
    top: 18px;
    right: 16px;
  }

  & h1 {
    margin-bottom: 4px;
  }

  ${(props) =>
    props.$notificationType !== "success" &&
    css<StyledBannerProps>`
      flex-direction: row;
      align-items: center;
      gap: 14px;
      padding: 0;
      border: 0.1px solid ${(props) => props.$themeColor};

      & svg {
        height: 32px;
        margin-bottom: 0;
        margin-left: 4px;
      }
      & div {
        flex: 1;
        position: relative;
        padding: 11px 8px 11px 0;

        &:before {
          content: "";
          position: absolute;
          opacity: 0.2;
          border-left: 1px solid var(--color-muted);
          height: 100%;
          top: 0;
          left: -12px;
        }
      }

      & p:first-child {
        color: ${(props) => props.$themeColor && props.$themeColor};
        margin-bottom: 0;
        font-weight: var(--font-weight-semibold);
        font-size: var(--text-sm);
      }
    `}
`;

interface BannerNotificationProps {
  children?: ReactNode;
  notificationType: SubmissionOutcome;
  actionType: ActionType;
  onClose?: () => void;
}

/* The Banner Notification is currently used to display success or error messages when adding or editing feedback. */
function BannerNotification({
  children,
  actionType,
  notificationType,
  onClose,
}: BannerNotificationProps): React.JSX.Element | null {
  if (!actionType && !notificationType) return null;

  const notificationMessage = buildNotificationMessage(
    notificationType,
    actionType
  );

  console.log("not message", notificationMessage);

  if (!notificationMessage) return null;

  return (
    <StyledBannerNotification
      $notificationType={notificationType}
      $themeColor={notificationMessage.iconColor}
    >
      {onClose && notificationType === "success" && (
        <button onClick={onClose}>
          <IoCloseSharp />
        </button>
      )}
      {
        <notificationMessage.icon
          size={45}
          color={notificationMessage.iconColor}
        />
      }
      <div>
        <H1 as={notificationType !== "success" ? "p" : "h1"}>
          {notificationMessage.content.title}
        </H1>
        <p>{notificationMessage.content.message}</p>
      </div>

      {children}
    </StyledBannerNotification>
  );
}

export default BannerNotification;
