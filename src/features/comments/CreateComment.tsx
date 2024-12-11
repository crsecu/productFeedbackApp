import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { useState } from "react";

function CreateComment(): React.JSX.Element {
  const fetcher = useFetcher();

  /*TO DO: look into memoization with Reselect before using this selector function 
  const commentAuthor = useAppSelector(getLoggedInUser);
  */
  const commentAuthor = useAppSelector((state) => state.user.validatedUser);
  const { name, username, image } = commentAuthor;

  const [commentContent, setCommentContent] = useState("");

  function handleSubmit() {
    const formData = new FormData();
    formData.append("content", commentContent);
    formData.append("author", JSON.stringify({ name, username, image }));

    fetcher.submit(formData, { method: "POST" });
  }

  return (
    <>
      <h2>Add a Comment</h2>
      <fetcher.Form onSubmit={handleSubmit}>
        <textarea
          id="commentInput"
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <button>Post Comment</button>
      </fetcher.Form>
    </>
  );
}

export default CreateComment;
