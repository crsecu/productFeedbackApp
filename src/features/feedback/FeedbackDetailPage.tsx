import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { FeedbackType } from "../../types/feedback.types";
import CommentList from "../comments/CommentList";

import CommentComposer from "../comments/CommentComposer";
import ActionBar from "../../ui/ActionBar";
import ModalWrapper from "../../ui/ModalWrapper";
import FeedbackForm from "./FeedbackForm";
import FeedbackDetailContent from "./FeedbackDetailContent";
import CommentSection from "../comments/CommentSection";

function FeedbackDetailPage(): React.JSX.Element {
  const loaderData = useLoaderData(); //1
  const navigate = useNavigate(); //2
  const [searchParams] = useSearchParams(); //3

  const feedback = loaderData as FeedbackType;

  if (!feedback) return <h1>Feedback Detail is not available.</h1>;

  const isFeedbackEntryNew =
    searchParams.get("status") === "new" ? true : false;

  const commentCount = feedback.commentCount ?? 0;

  return (
    <>
      <ActionBar>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <br></br>
        <br></br>
        <ModalWrapper>
          <FeedbackForm
            httpMethod="PATCH"
            mode="edit"
            feedbackEntryData={feedback}
          ></FeedbackForm>
        </ModalWrapper>
      </ActionBar>
      <FeedbackDetailContent feedback={feedback}>
        <CommentSection>
          {!isFeedbackEntryNew && commentCount > 0 && (
            <CommentList commentCount={commentCount} feedbackId={feedback.id} />
          )}

          <CommentComposer commentCount={commentCount}>
            <h2>Add a Comment</h2>
          </CommentComposer>
        </CommentSection>
      </FeedbackDetailContent>
    </>
  );
}

export default FeedbackDetailPage;
