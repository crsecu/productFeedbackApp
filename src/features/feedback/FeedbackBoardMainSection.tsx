import { ReactNode } from "react";

interface FeedbackBoardMainSectionProps {
  children: ReactNode;
}
function FeedbackBoardMainSection({
  children,
}: FeedbackBoardMainSectionProps): React.JSX.Element {
  return <main>{children}</main>;
}

export default FeedbackBoardMainSection;
