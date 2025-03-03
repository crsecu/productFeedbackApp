import { ReactNode } from "react";

/* The Banner Notification is currently used for displaying errors when adding feedback fails */
interface BannerNotificationProps {
  children?: ReactNode;
  notificationType: "createFeedback_failed" | "createFeedback_success";
}

const messages = {
  createFeedback_failed: {
    title: "Failed to Create Feedback",
    message:
      "We couldn't submit your feedback. Please try again or press Cancel to go back.",
  },
  createFeedback_success: {
    title: "Feedback Created!",
    message:
      "Your feedback has been added. You can view the details or go back to the previous page",
  },
  editFeedback_failed: {
    title: "Failed to Update Feedback",
    message: "We couldn't update your feedback. Please try again.",
  },
  editFeedback_success: {
    title: "Feedback Updated!",
    message: "Your feedback changes have been saved.",
  },
};
function BannerNotification({
  children,
  notificationType,
}: BannerNotificationProps): React.JSX.Element {
  const notificationMessage = messages[notificationType];
  const color =
    notificationType === "createFeedback_success" ? "#2e9f5a" : "#df4a4a";
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        {notificationMessage.title}
      </p>
      <p>{notificationMessage.message}</p>
      {children}
    </div>
  );
}

export default BannerNotification;
