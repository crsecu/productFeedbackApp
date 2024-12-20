import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { useState } from "react";
import { RootCommentDataType } from "../feedback/feedback.types";

interface CommentComposerProps {
  mode: "comment" | "reply";
  commentCount: number;
  // rootCommentData prop only needed when CommentComposer is used in "reply" mode
  rootCommentData?: RootCommentDataType; // it contains data about the base comment (original comment) that replies are associated with;
}

function CommentComposer({
  mode = "comment",
  commentCount,
  rootCommentData,
}: CommentComposerProps): React.JSX.Element {
  const fetcher = useFetcher();

  /*TO DO: look into memoization with Reselect before using this selector function 
  const commentAuthor = useAppSelector(getLoggedInUser);
  */
  const commentAuthor = useAppSelector((state) => state.user.validatedUser);
  const { name, username, image } = commentAuthor;

  const [commentContent, setCommentContent] = useState("");

  function handleSubmit() {
    const formData = new FormData();
    formData.append("mode", mode);
    formData.append("content", commentContent);
    formData.append("currentCommentCount", JSON.stringify(commentCount));
    formData.append("author", JSON.stringify({ name, username, image }));

    /* data submitted conditionally when mode = 'reply'*/
    if (mode === "reply") {
      formData.append("rootComment", JSON.stringify(rootCommentData));
    }

    fetcher.submit(formData, {
      method: "POST",
    });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          id="commentInput"
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <button>Post Comment</button>
      </form>
    </>
  );
}

export default CommentComposer;
