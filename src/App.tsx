import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  feedbackBoardLoader,
  roadmapDevLoader,
  feedbackDetailLoader,
  commentDataLoader,
} from "./data_handlers/feedbackLoaders";
import {
  createFeedbackAction,
  submitCommentAction,
} from "./data_handlers/feedbackActions";

import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";

import ErrorPage from "./ui/ErrorPage";
import NotFoundPage from "./ui/NotFoundPage";
import RootRoute from "./ui/RootRoute";

import { editFeedbackAction } from "./data_handlers/feedbackActions";

import CreateFeedback from "./features/feedback/CreateFeedback";
import PageLayout from "./ui/PageLayout";
import FeedbackBoardError from "./ui/FeedbackBoardError";

import GlobalStyles from "./styles/GlobalStyles";
import FeedbackDetailCommentThread from "./features/feedback/FeedbackDetailCommentThread";
import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import TypographyTokens from "./styles/TypographyTokens";

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
        element: <PageLayout />,
        loader: feedbackBoardLoader,
        id: "feedbackBoardData",
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          actionResult,
          formMethod,
        }) => {
          console.log("current", currentUrl);
          console.log("next", nextUrl);

          /*  Prevent revalidation if only search params change in the URL */
          if (currentUrl.search !== nextUrl.search) {
            console.log("Skipping revalidation: only search params changed");
            return false;
          } else {
            console.log("RELOAD");
          }

          /* Prevent revalidation if feedback submission fails or if there are any validation errors */
          if (
            formMethod === "post" &&
            actionResult?.submissionOutcome !== "success"
          ) {
            return false;
          }
        },
        children: [
          {
            index: true,

            element: <FeedbackBoardPage />,
          },
          {
            path: "createFeedback",
            element: <CreateFeedback />,
            action: createFeedbackAction,
          },
        ],
      },
      {
        path: "/developmentRoadmap",
        element: <PageLayout />,
        loader: roadmapDevLoader,
        id: "roadmapData",
        shouldRevalidate: ({ actionResult }) => {
          if (actionResult?.submissionOutcome !== "success") {
            return false; // prevent clearing `useActionData()`
          }
        },
        children: [
          {
            index: true,
            element: <RoadmapPage />,
          },
          {
            path: "createFeedback",
            element: <CreateFeedback />,
            action: createFeedbackAction,
          },
        ],
      },
      {
        path: "/feedbackDetail/:feedbackId",
        element: <FeedbackDetailPage />,
        id: "feedbackDetailData",

        loader: feedbackDetailLoader,
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          formMethod,
          actionResult,
        }) => {
          //prevent revalidation when canceling edit feedback
          if (currentUrl.pathname === nextUrl.pathname && !actionResult) {
            console.log("I SHOULD PREVENT NOW");
            return false;
          }
          if (formMethod === "post") return false;

          /* Prevent revalidation if "editFeedback" submission fails or if there are any validation errors */
          if (
            formMethod === "patch" &&
            actionResult?.submissionOutcome !== "success"
          ) {
            console.log("Revalidation prevented: EDIT FEEDBACK FAILED");
            return false;
          }
        },

        children: [
          {
            index: true,
            element: <FeedbackDetailCommentThread />,
            id: "commentData", //might not need this id unless we need access to the comment data in a different route
            loader: commentDataLoader,
            action: submitCommentAction,
            shouldRevalidate: ({
              formMethod,
              actionResult,
              currentUrl,
              nextUrl,
            }) => {
              if (formMethod === "patch") return false;

              if (actionResult?.submissionOutcome !== "success") {
                return false; // prevent clearing `useActionData()`
              }
            },
          },
          {
            path: "editFeedback",
            action: editFeedbackAction,
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App(): React.JSX.Element {
  return (
    <>
      <TypographyTokens />
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
