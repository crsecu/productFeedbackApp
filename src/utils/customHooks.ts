/* The "useShowCreateFeedbackForm" returns true if the current URL path contains 'createFeedback' as a segment, indicating that the "CreateFeedback" component should be rendered as a child route */

import { useLocation } from "react-router-dom";

export function useShowCreateFeedbackForm() {
  const location = useLocation();

  return location.pathname.includes("createFeedback");
}
