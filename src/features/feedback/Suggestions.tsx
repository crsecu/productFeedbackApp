import { ReactNode } from "react";

interface SuggestionsProps {
  children: ReactNode;
}
function Suggestions({ children }: SuggestionsProps): React.JSX.Element {
  return <div className="feedbackBoard_layout">{children}</div>;
}

export default Suggestions;
