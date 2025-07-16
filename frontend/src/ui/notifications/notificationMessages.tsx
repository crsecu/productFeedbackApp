import { SubmissionOutcome, ActionType } from "../../types/action.types";
import { IconType } from "react-icons";
import {
  BiSolidCheckCircle,
  BiSolidErrorCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import styled from "styled-components";

interface NotificationText {
  title: string;
  message?: string;
}

interface NotificationMessage {
  content: NotificationText;
  icon: IconType;
  iconColor: string;
  backgroundColor: string;
}

const validationErrorText: NotificationText = {
  title: "Missing Information",
  message: "Please fill out all fields before submitting the form.",
};

const notificationTextByOutcome: Record<
  Exclude<SubmissionOutcome, "validationError">,
  Record<ActionType, NotificationText>
> = {
  failure: {
    createFeedback: {
      title: "Failed to Create Feedback",
      message: "We couldn't submit your feedback. Please try again.",
    },
    editFeedback: {
      title: "Failed to Update Feedback",
      message:
        "We couldn't update your feedback. Please try again or press Cancel to go back.",
    },
    addComment: {
      title: "Something went wrong!",
      message: "Comment submission failed.",
    },
    createUser: {
      title: "User Creation Failed",
      message: "There was an issue creating the user. Please try again.",
    },
    authenticateUser: {
      title: "User Authentication Failed",
    },
  },

  success: {
    createFeedback: {
      title: "Feedback Created!",
      message:
        "Your feedback has been added. You can view the details or go back to the previous page",
    },
    editFeedback: {
      title: "Feedback Updated!",
      message: "Your feedback changes have been saved.",
    },
    addComment: {
      title: "Something went wrong!",
      message: "Comment submission failed.",
    },
    createUser: {
      title: "Thanks for signing up!",
      message: "Please check your email to confirm your account.",
    },
  },
};

export function buildNotificationMessage(
  type: SubmissionOutcome,
  action: ActionType
): NotificationMessage {
  if (type === "validationError")
    return {
      content: validationErrorText,
      icon: BiSolidErrorCircle,
      iconColor: "#a1670f",
      backgroundColor: "rgba(161, 103, 15, 0.2)",
    };

  const icon = type === "success" ? BiSolidCheckCircle : BiSolidXCircle;
  const iconColor = type === "success" ? "#2e7d32" : "#a71818";
  const backgroundColor =
    type === "success" ? "rgba(46, 125, 50, 0.2)" : "rgba(167, 24, 24, 0.2)";

  const data = notificationTextByOutcome[type][action];
  return { content: data, icon, iconColor, backgroundColor };
}
