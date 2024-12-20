import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { feedbackLoader, detailLoader } from "./data_handlers/feedbackLoaders";
import { createFeedbackAction } from "./data_handlers/feedbackActions";
import { editFeedbackAction } from "./data_handlers/feedbackActions";
import HomePage from "./ui/HomePage";
import FeedbackBoardPage from "./features/feedback/FeedbackBoardPage";
import RoadmapPage from "./features/roadmap/RoadmapPage";
import CreateFeedbackPage from "./features/feedback/CreateFeedbackPage";
import EditFeedbackPage from "./features/feedback/EditFeedbackPage";
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
    action: editFeedbackAction,
  },
  {
    path: "/feedbackDetail/:feedbackId",
    element: <FeedbackDetailPage />,
    loader: detailLoader,
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
