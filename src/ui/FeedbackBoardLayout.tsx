import { ReactNode } from "react";

interface FeedbackBoardLayoutProps {
  leftSection: ReactNode;
  mainSection: ReactNode;
}
function FeedbackBoardLayout({
  leftSection,
  mainSection,
}: FeedbackBoardLayoutProps): React.JSX.Element {
  return (
    <div className="feedbackBoard_layout">
      <div className="feecbackBoard_leftSection">{leftSection}</div>
      <main className="feedbackBoard_main">{mainSection}</main>
    </div>
  );
}

export default FeedbackBoardLayout;
