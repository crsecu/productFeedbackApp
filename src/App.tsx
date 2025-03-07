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

import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";

import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import ErrorPage from "./ui/ErrorPage";
import NotFoundPage from "./ui/NotFoundPage";
import RootRoute from "./ui/RootRoute";

import { editFeedbackAction } from "./data_handlers/feedbackActions";
import EditFeedback from "./features/feedback/EditFeedback";
import CreateFeedback from "./features/feedback/CreateFeedback";
import DataProvider from "./data_handlers/DataProvider";
import FeedbackBoardError from "./ui/FeedbackBoardError";

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
        element: <FeedbackBoardPage />,
        loader: feedbackBoardLoader,
        errorElement: <FeedbackBoardError />,
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          actionResult,
          formMethod,
        }) => {
          console.log("current", currentUrl);
          console.log("next", nextUrl);
          console.log("action result", actionResult);

          /* Prevent revalidation if feedback submission fails or if there are any validation errors */
          if (formMethod === "post" && !actionResult.success) {
            console.log("Revalidation prevented: feedback submission failed");
            return false;
          }

          //  Prevent revalidation if only search params change in the URL
          if (
            currentUrl.pathname === nextUrl.pathname &&
            currentUrl.search !== nextUrl.search
          ) {
            console.log("Skipping revalidation: only search params changed");
            return false;
          }
        },
        children: [
          {
            path: "createFeedback",
            element: <CreateFeedback />,
            action: createFeedbackAction,
          },
        ],
      },
      {
        path: "/developmentRoadmap",
        element: <DataProvider PageComponent={RoadmapPage} />,
        loader: roadmapDevLoader,
        children: [
          {
            path: "createFeedback",
            element: <CreateFeedback />,
            action: createFeedbackAction,
          },
        ],
      },
      {
        path: "/feedbackDetail/:feedbackId",
        element: <DataProvider PageComponent={FeedbackDetailPage} />,
        loader: detailLoader,
        shouldRevalidate: ({ formMethod }) => {
          /* Prevent revalidation on edit feedback form submission - UI is updated optimistically, no re-fetch needed. */
          if (formMethod === "patch") {
            console.log(
              "Revalidation skipped: Edit Feedback - UI updated optimistically"
            );
            return false;
          }
        },
        action: submitCommentAction,
        children: [
          {
            path: "editFeedback",
            element: <EditFeedback />,
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
