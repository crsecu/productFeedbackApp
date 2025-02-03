import { memo, ReactNode } from "react";

interface FeedbackItemProps {
  children: ReactNode;
}
function FeedbackItem({ children }: FeedbackItemProps): React.JSX.Element {
  return <div>{children}</div>;
}

export default memo(FeedbackItem);
