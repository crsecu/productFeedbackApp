import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setFeedbackList } from "../features/feedback/feedbackSlice";
import { FeedbackType } from "../types/feedback.types";

interface StateSyncWrapperProps {
  children: React.ReactNode;
}

function StateSyncWrapper({
  children,
}: StateSyncWrapperProps): React.JSX.Element {
  const dataFromLoader = useLoaderData() as FeedbackType[];

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (dataFromLoader) {
        dispatch(setFeedbackList(dataFromLoader));
      }
    },
    [dataFromLoader, dispatch]
  );

  return (
    <div>
      <h1>Hi from Wrapper Component</h1>
      {children}
    </div>
  );
}

export default StateSyncWrapper;
