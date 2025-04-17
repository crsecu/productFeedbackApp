import { ReactNode } from "react";
import { ActionType, SubmissionOutcome } from "../types/action.types";

interface BannerNotificationProps {
  children?: ReactNode;
  notificationType: SubmissionOutcome;
  actionType: ActionType;
}

const notificationColors = {
  validationError: {
    color: "#c6c4a3",
  },
  failure: {
    color: "#df4a4a",
  },
  success: {
    color: "#2e9f5a",
  },
};

const messages: Record<
  ActionType,
  Record<SubmissionOutcome, { title: string; message: string }>
> = {
  createFeedback: {
    validationError: {
      title: "Oops! Some Fields Need Your Attention",
      message: "Please correct the highlighted fields and try again.",
    },
    failure: {
      title: "Failed to Create Feedback",
      message:
        "We couldn't submit your feedback. Please try again or press Cancel to go back.",
    },
    success: {
      title: "Feedback Created!",
      message:
        "Your feedback has been added. You can view the details or go back to the previous page",
    },
  },
  editFeedback: {
    validationError: {
      title: "Oops! Some Fields Need Your Attention",
      message: "Please correct the highlighted fields and try again.",
    },
    failure: {
      title: "Failed to Update Feedback",
      message:
        "We couldn't update your feedback. Please try again or press Cancel to go back.",
    },
    success: {
      title: "Feedback Updated!",
      message: "Your feedback changes have been saved.",
    },
  },
  addComment: {
    validationError: {
      title: "",
      message: "",
    },
    success: {
      title: "Comment submitted!",
      message: "Your comment has been submitted.",
    },
    failure: {
      title: "Something went wrong!",
      message: "Comment submission failed.",
    },
  },
};

/* The Banner Notification is currently used to display success or error messages when adding or editing feedback. */
function BannerNotification({
  children,
  actionType,
  notificationType,
}: BannerNotificationProps): React.JSX.Element | null {
  if (!actionType && !notificationType) return null;

  // /const bannerColor = notificationColors[notificationType]?.color;

  const notificationMessage = messages[actionType]?.[notificationType];

  if (!notificationMessage) return null;

  return (
    <div>
      <p>{notificationMessage.title}</p>
      <p>{notificationMessage.message}</p>
      {children}
    </div>
  );
}

export default BannerNotification;
