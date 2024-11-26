import { ActionFunctionArgs, redirect } from "react-router-dom";
import { submitFeedback } from "../services/apiFeedback";

//Submit New Feedback Action Function
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    title: string;
    description: string;
    category: string;
  };

  const feedback = {
    ...data,
    status: "suggestion",
    upvotes: 0,
  };

  const newFeedback = await submitFeedback(feedback);

  console.log("submitted feedback", newFeedback);

  return redirect(`/feedbackDetail/${newFeedback.id}`);
}
