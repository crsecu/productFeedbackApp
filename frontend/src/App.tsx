import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  feedbackBoardLoader,
  roadmapDevLoader,
  feedbackDetailLoader,
  commentDataLoader,
  authGuardLoader,
} from "./data_handlers/feedbackLoaders";
import {
  createFeedbackAction,
  submitCommentAction,
} from "./data_handlers/feedbackActions";

import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";
import ErrorPage from "./ui/ErrorPage";
import NotFoundPage from "./ui/NotFoundPage";
import { editFeedbackAction } from "./data_handlers/feedbackActions";
import CreateFeedback from "./features/feedback/CreateFeedback";
import PageLayout from "./ui/PageLayout";
import GlobalStyles from "./styles/GlobalStyles";
import FeedbackDetailCommentThread from "./features/feedback/FeedbackDetailCommentThread";
import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import TypographyTokens from "./styles/TypographyTokens";

import {
  createUserProfileAction,
  loginUserAction,
  signUpUserAction,
} from "./data_handlers/userActions";
import LoginPage from "./features/user/LoginPage";
import Signup from "./features/user/Signup";
import ProtectedRoutes from "./ui/ProtectedRoutes";

import WelcomeUser from "./features/user/WelcomeUser";
import { loginLoader } from "./data_handlers/userLoader";
import AuthGuard from "./features/user/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: loginLoader,
    action: loginUserAction,
    shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) => {
      console.log(
        "LOGIN, current route",
        currentUrl,
        "LOGIN, next route",
        nextUrl,
        "LOGIN, default revalidator",
        defaultShouldRevalidate
      );
      return defaultShouldRevalidate;
    },

    children: [
      { path: "signup", element: <Signup />, action: signUpUserAction },
      {
        path: "welcome",
        element: <WelcomeUser />,
        action: createUserProfileAction,
      },
    ],
  },

  {
    path: "/",
    element: <AuthGuard />,
    loader: authGuardLoader,
    shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) => {
      console.log(
        "AUTHGUARD, current route",
        currentUrl,
        "AUTHGUARD, next route",
        nextUrl,
        "AUTHGUARD, default revalidator",
        defaultShouldRevalidate
      );
      return defaultShouldRevalidate;
    },
  },

  {
    path: "/app",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "feedbackBoard",
        element: <FeedbackBoardPage />,
        loader: feedbackBoardLoader,
        id: "feedbackBoardData",
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          actionResult,
          defaultShouldRevalidate,
        }) => {
          console.log("current", currentUrl);
          console.log("next", nextUrl);

          /*  Prevent revalidation if only search params change in the URL */
          if (currentUrl.search !== nextUrl.search) {
            console.log("Skipping revalidation: only search params changed");
            return false;
          }

          /* Prevent revalidation when navigation to /createFeedback*/
          if (
            currentUrl.pathname === "/" &&
            nextUrl.pathname === "/createFeedback"
          ) {
            console.log(
              'Preventing revalidation when navigation to "/createFeedback"'
            );

            return false;
          }

          /* Prevent revalidation if feedback submission fails or if there are any validation errors */
          if (actionResult?.submissionOutcome !== "success") {
            return false;
          }
          console.log(
            "this is default loader revalidation",
            defaultShouldRevalidate
          );
          return defaultShouldRevalidate;
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
        path: "developmentRoadmap",
        element: <PageLayout />,
        loader: roadmapDevLoader,
        id: "roadmapData",
        shouldRevalidate: ({ actionResult, defaultShouldRevalidate }) => {
          if (actionResult?.submissionOutcome !== "success") {
            return false; // prevent clearing `useActionData()`
          }

          return defaultShouldRevalidate;
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
        path: "feedbackDetail/:feedbackId",
        element: <FeedbackDetailPage />,
        id: "feedbackDetailData",

        loader: feedbackDetailLoader,
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          formMethod,
          actionResult,
          defaultShouldRevalidate,
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

          return defaultShouldRevalidate;
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
              defaultShouldRevalidate,
            }) => {
              if (formMethod === "patch") return false;

              if (actionResult?.submissionOutcome !== "success") {
                return false; // prevent clearing `useActionData()`
              }

              return defaultShouldRevalidate;
            },
          },
          {
            path: "editFeedback",
            action: editFeedbackAction,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
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
