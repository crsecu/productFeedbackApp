import { ReactNode } from "react";

interface FeedbackBoardSidebarProps {
  children: ReactNode;
}
function FeedbackBoardSidebar({
  children,
}: FeedbackBoardSidebarProps): React.JSX.Element {
  return <div>{children}</div>;
}

export default FeedbackBoardSidebar;
