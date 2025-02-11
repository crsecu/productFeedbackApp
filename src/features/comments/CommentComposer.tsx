import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { useState } from "react";
import { CommentKindType } from "../../types/comment.types";

interface CommentComposerProps {
  children: React.ReactNode;
  mode?: CommentKindType;
  commentCount: number;
  // parentId, parentType, and authorUsername props only needed when CommentComposer is used in "reply" mode
  parentId?: string; // parent comment a reply belongs to;
  parentType?: CommentKindType;
  authorUsername?: string; //parent comment author
}

function CommentComposer({
  children,
  mode = "comment",
  commentCount,
  parentId,
  parentType,
  authorUsername,
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
      formData.append("parentId", parentId);
      formData.append("parentType", parentType);
      formData.append("replyingTo", authorUsername);
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
        {children}
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
