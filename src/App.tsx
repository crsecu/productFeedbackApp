import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { feedbackLoader } from "./data_handlers/feedbackLoader";
import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";
import CreateFeedbackPage from "./features/feedback/CreateFeedbackPage";
import EditFeedbackPage from "./features/feedback/EditFeedbackPage";
import FeedbackDetailPage from "./features/feedback/FeedbackDetailPage";
import ErrorPage from "./ui/ErrorPage";
import { action as createFeedbackAction } from "./data_handlers/feedbackActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/feedbackBoard",
    element: <FeedbackBoardPage />,
    loader: feedbackLoader,
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
    path: "/editFeedback/:feedbackId",
    element: <EditFeedbackPage />,
  },
  {
    path: "/feedbackDetail/:feedbackId",
    element: <FeedbackDetailPage />,
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
