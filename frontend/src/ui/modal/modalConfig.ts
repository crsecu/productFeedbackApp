//Modal types (keys representing specific modal scenarios)
export type ModalType =
  | "cancel_addFeedback"
  | "cancel_editFeedback"
  | "delete_feedback";

//Config structure for each modal
export interface ModalConfig {
  title: string;
  description: string;
  decisionButton: string;
  wayoutButton: string;
}

//Message content for each modal
export const modalMessages: Record<ModalType, ModalConfig> = {
  cancel_addFeedback: {
    title: "Discard Feedback Draft?",
    description:
      "You will loose all the information entered for this feedback.",
    decisionButton: "Discard Feedback",
    wayoutButton: "Keep it",
  },
  cancel_editFeedback: {
    title: "Discard Feedback Changes?",
    description: "You will loose all the changes made to this feedback.",
    decisionButton: "Discard changes",
    wayoutButton: "Keep editing",
  },
  delete_feedback: {
    title: "Delete Feedback?",
    description:
      "This action will permanently remove the feedback and cannot be undone.",
    decisionButton: "Delete",
    wayoutButton: "Cancel",
  },
};
