import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { ReactNode, useState } from "react";
import { CommentKindType } from "../../types/comment.types";

type CommentComposerProps = {
  children?: ReactNode;
  commentCount: number;
} & (
  | { mode: "comment" }
  | {
      mode: "reply";
      setShowAddReply: React.Dispatch<React.SetStateAction<boolean>>;
      parentId: string; // parent comment a reply belongs to;
      parentType: CommentKindType;
      authorUsername: string; //parent comment author
    }
);

function CommentComposer(props: CommentComposerProps): React.JSX.Element {
  const fetcher = useFetcher();

  const [commentContent, setCommentContent] = useState("");

  const commentAuthor = useAppSelector((state) => state.user.validatedUser);

  const { children, commentCount, mode } = props;

  const { name, username, image } = commentAuthor;

  function handleSubmit() {
    const formData = new FormData();
    formData.append("mode", mode);
    formData.append("intent", "addComment");
    formData.append("content", commentContent);
    formData.append("currentCommentCount", JSON.stringify(commentCount));
    formData.append("author", JSON.stringify({ name, username, image }));

    /* data submitted conditionally when mode === 'reply'*/
    if (mode === "reply") {
      const { parentId, parentType, authorUsername } = props;
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
          setCommentContent("");
        }}
      >
        {children}

        <textarea
          id="commentInput"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <button disabled={commentContent.trim() === ""}>
          {fetcher.state !== "idle" ? "Posting comment..." : "Post Comment"}
        </button>
      </form>
    </>
  );
}

export default CommentComposer;
