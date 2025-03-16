/* The "useShowCreateFeedbackForm" hook returns true if the current URL path matches one of the two routes where the "CreateFeedback" component should be rendered as a child route. */

import { useActionData, useLocation } from "react-router-dom";
import { FeedbackActionResult, SuggestionType } from "../types/feedback.types";

export function useShowCreateFeedback() {
  const location = useLocation();

  return (
    location.pathname === "/feedbackBoard/createFeedback" ||
    location.pathname === "/developmentRoadmap/createFeedback"
  );
}

/* This hook reads data returned by the Create Feedback action function after submission 
 - if submission is successful, it pushes payload (new feedback) into the suggestionsList, updating the UI optimistically
*/

export function UpdateSuggestionList(suggestions: SuggestionType[]) {
  const dataFromAction = useActionData() as FeedbackActionResult | undefined;

  if (!dataFromAction) return suggestions;

  const newFeedback = dataFromAction.success ? dataFromAction.payload : {};

  return [newFeedback, ...suggestions];
}
