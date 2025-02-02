import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  feedbackBoardLoader,
  detailLoader,
  roadmapDevLoader,
} from "./data_handlers/feedbackLoaders";
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
    loader: feedbackBoardLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => {
      console.log("current", currentUrl);
      console.log("next", nextUrl);

      // prevent revalidation if only search params change
      if (
        currentUrl.pathname === nextUrl.pathname &&
        currentUrl.search !== nextUrl.search
      ) {
        console.log("skipping revalidation: only search params changed");
        return false;
      }

      // prevent revalidation when navigating to createFeedback
      if (
        currentUrl.pathname === "/feedbackBoard" &&
        nextUrl.pathname === "/feedbackBoard/createFeedback"
      ) {
        console.log(
          "skipping revalidation when navigating to createFeedback form"
        );
        return false;
      }
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "createFeedback",
        element: <CreateFeedbackPage />,
        action: createFeedbackAction,
      },
    ],
  },
  {
    path: "/developmentRoadmap",
    element: <RoadmapPage />,
    loader: roadmapDevLoader,
    children: [
      {
        path: "createFeedback",
        element: <CreateFeedbackPage />,
        action: createFeedbackAction,
      },
    ],
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
