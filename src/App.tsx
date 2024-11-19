import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { feedbackLoader } from "./loaders/feedbackLoader";
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
