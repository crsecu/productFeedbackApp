import { ReactNode } from "react";

/* The Banner Notification is currently used to display success or error messages when adding or editing feedback. */
interface BannerNotificationProps {
  children?: ReactNode;
  notificationType:
    | "createFeedback_failed"
    | "createFeedback_success"
    | "editFeedback_failed"
    | "editFeedback_success";
}

const messages = {
  createFeedback_failed: {
    title: "Failed to Create Feedback",
    message:
      "We couldn't submit your feedback. Please try again or press Cancel to go back.",
    color: "#df4a4a",
  },
  createFeedback_success: {
    title: "Feedback Created!",
    message:
      "Your feedback has been added. You can view the details or go back to the previous page",
    color: "#2e9f5a",
  },
  editFeedback_failed: {
    title: "Failed to Update Feedback",
    message: "We couldn't update your feedback. Please try again.",
    color: "#df4a4a",
  },
  editFeedback_success: {
    title: "Feedback Updated!",
    message: "Your feedback changes have been saved.",
    color: "#2e9f5a",
  },
};
function BannerNotification({
  children,
  notificationType,
}: BannerNotificationProps): React.JSX.Element {
  const notificationMessage = messages[notificationType];

  return (
    <div
      style={{
        backgroundColor: notificationMessage.color,
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
