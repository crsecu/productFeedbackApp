import { IconType } from "react-icons";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";

//Toast types
export type ToastThemeType = "success" | "error";

// Keys representing specific toast notification scenarios
export type ToastKey =
  | "deleteFeedback_success"
  | "deleteFeedback_error"
  | "upvoteFeedback_success"
  | "upvoteFeedback_error";

// Config structure for each toast theme
interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  icon: IconType | string;
}

// Theme styles and icons for each toast type
export const toastTheme: Record<ToastThemeType, ThemeConfig> = {
  success: {
    backgroundColor: "#b6e4b8",
    textColor: "#0b8b11",
    icon: BiSolidCheckCircle,
  },
  error: {
    backgroundColor: "#df8181",
    textColor: "#a20e0e",
    icon: BiSolidXCircle,
  },
};

// Message content and type for each toast notification
export const toastMessages: Record<
  ToastKey,
  { type: "success" | "error"; message?: string }
> = {
  deleteFeedback_success: {
    type: "success",
    message: "Your feedback has been deleted successfully!",
  },
  deleteFeedback_error: {
    type: "error",
    message: "Failed to delete feedback. Please try again.",
  },
  upvoteFeedback_success: {
    type: "success",
  },
  upvoteFeedback_error: {
    type: "error",
    message: "Couldn't upvote. Check your connection and try again.",
  },
};
