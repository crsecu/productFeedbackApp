import { ReactNode } from "react";

/* The Banner Notification is currently used for displaying errors when adding feedback fails */
interface BannerNotificationProps {
  children?: ReactNode;
  notificationType: "createFeedback_failed" | "createFeedback_success";
}

const messages = {
  createFeedback_failed: {
    title: "Feedback Submission Failed",
    message:
      'Submission failed. Try again or press "Cancel" to return to the previous',
  },
  createFeedback_success: {
    title: "Feedback Submission Successful",
    message:
      "You can check the feedback detail here: ..., or return to Feedback Board",
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
