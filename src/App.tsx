import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { feedbackLoader, detailLoader } from "./data_handlers/feedbackLoaders";
import {
  createFeedbackAction,
  submitDetailAction,
} from "./data_handlers/feedbackActions";

import StateSyncWrapper from "./data_handlers/StateSyncWrapper";
import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";
import CreateFeedbackPage from "./features/feedback/CreateFeedbackPage";
import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import ErrorPage from "./ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/feedbackBoard",
    element: (
      <StateSyncWrapper>
        <FeedbackBoardPage />
      </StateSyncWrapper>
    ),
    loader: feedbackLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) =>
      currentUrl.pathname !== nextUrl.pathname,
    /* TO DO: don't revalidate if curentUrl.pathname contains "new" */
    errorElement: <ErrorPage />,
  },
  {
    path: "/developmentRoadmap",
    element: <RoadmapPage />,
  },
  {
    path: "/createFeedback",
    element: <CreateFeedbackPage />,
    action: createFeedbackAction,
  },
  {
    path: "/feedbackDetail/:feedbackId",
    element: <FeedbackDetailPage />,
    loader: detailLoader,
    action: submitDetailAction,
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
