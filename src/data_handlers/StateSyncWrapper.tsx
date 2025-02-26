import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFeedbackList } from "../store/slices/feedbackSlice";
import { FeedbackBoardLoaderData } from "../types/feedback.types";

interface StateSyncWrapperProps {
  children: React.ReactNode;
}

function StateSyncWrapper({
  children,
}: StateSyncWrapperProps): React.JSX.Element {
  const dataFromLoader = useLoaderData() as FeedbackBoardLoaderData;

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
