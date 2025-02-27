import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFeedbackList } from "../store/slices/feedbackSlice";
import { FeedbackBoardLoaderData } from "../types/feedback.types";

interface StateSyncWrapperProps {
  children?: React.ReactNode;
}

function StateSyncWrapper({
  children,
}: StateSyncWrapperProps): React.JSX.Element {
  const dataFromLoader = useLoaderData() as FeedbackBoardLoaderData;
  /* problem: dataFromLoader has a new reference each time the feedbackBoard page is revisited(each time the loader gets invoked)
  - this causes the effect to dispatch a new action to Redux store even when the dataFromLoader hasn't changed (unnecessary Redux update)
  TO DO: Find a way to dispatch only when data isn't already in Redux
   
  potential solutions:
 

  */

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (dataFromLoader) {
        dispatch(setFeedbackList(dataFromLoader.suggestions));
      }
    },
    [dataFromLoader, dispatch]
  );

  return <div>{children}</div>;
}

export default StateSyncWrapper;
