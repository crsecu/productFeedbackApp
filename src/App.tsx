import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./ui/Home";
import FeedbackBoard from "./features/feedback/FeedbackBoard";
import Roadmap from "./features/roadmap/Roadmap";
import CreateFeedback from "./features/feedback/CreateFeedback";
import EditFeedback from "./features/feedback/EditFeedback";
import FeedbackDetail from "./features/feedback/FeedbackDetail";
import ErrorPage from "./ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/feedbackBoard",
        element: <FeedbackBoard />,
      },
      {
        path: "/developmentRoadmap",
        element: <Roadmap />,
      },
      {
        path: "/createFeedback",
        element: <CreateFeedback />,
      },
      {
        path: "/editFeedback/:feedbackId",
        element: <EditFeedback />,
      },
      {
        path: "/feedbackDetail/:feedbackId",
        element: <FeedbackDetail />,
      },
    ],
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
