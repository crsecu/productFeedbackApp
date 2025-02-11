import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  feedbackBoardLoader,
  detailLoader,
  roadmapDevLoader,
} from "./data_handlers/feedbackLoaders";
import {
  createFeedbackAction,
  submitCommentAction,
} from "./data_handlers/feedbackActions";

import StateSyncWrapper from "./data_handlers/StateSyncWrapper";
import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";
import CreateFeedbackPage from "./features/feedback/CreateFeedbackPage";
import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import ErrorPage from "./ui/ErrorPage";
import NotFoundPage from "./ui/NotFoundPage";
import RootRoute from "./ui/RootRoute";
import EditFeedbackPage from "./features/feedback/EditFeedbackPage";
import { editFeedbackAction } from "./data_handlers/feedbackActions";

const router = createBrowserRouter([
  {
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/feedbackBoard",
        element: (
          <StateSyncWrapper>
            <FeedbackBoardPage />
          </StateSyncWrapper>
        ),
        loader: feedbackBoardLoader,
        shouldRevalidate: ({ currentUrl, nextUrl, actionResult }) => {
          console.log("current", currentUrl);
          console.log("next", nextUrl);

          //prevent revalidation when createFeedback form contains validation errors
          if (actionResult && "errors" in actionResult) {
            return false;
          }

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
        shouldRevalidate: ({ currentUrl, nextUrl, actionResult }) => {
          console.log("current detail", currentUrl);
          console.log("next detail", nextUrl);
          console.log("actionResult", actionResult);

          //prevent revalidation when editFeedback form contains validation errors
          if (actionResult && "errors" in actionResult) {
            return false;
          }
        },
        action: submitCommentAction,
        children: [
          {
            path: "editFeedback",
            element: <EditFeedbackPage />,
            action: editFeedbackAction,
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
