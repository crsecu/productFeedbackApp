import { memo, ReactNode } from "react";

interface FeedbackItemProps {
  children: ReactNode;
}
function FeedbackItem({ children }: FeedbackItemProps): React.JSX.Element {
  //console.log("FeedbackItem");
  return <div>{children}</div>;
}

export default memo(FeedbackItem);
