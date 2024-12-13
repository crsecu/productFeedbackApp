import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { FormEvent, useState } from "react";

interface CreateCommentProps {
  commentCount: number;
}
function CreateComment({
  commentCount,
}: CreateCommentProps): React.JSX.Element {
  const fetcher = useFetcher();

  /*TO DO: look into memoization with Reselect before using this selector function 
  const commentAuthor = useAppSelector(getLoggedInUser);
  */
  const commentAuthor = useAppSelector((state) => state.user.validatedUser);
  const { name, username, image } = commentAuthor;

  const [commentContent, setCommentContent] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", commentContent);
    formData.append("currentCommentCount", JSON.stringify(commentCount));
    formData.append("author", JSON.stringify({ name, username, image }));

    fetcher.submit(formData, {
      method: "POST",
    });
  }

  return (
    <>
      <h2>Add a Comment</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          id="commentInput"
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <button>Post Comment</button>
      </form>
    </>
  );
}

export default CreateComment;
