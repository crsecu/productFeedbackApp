import { Comment } from "../features/feedback/feedback.types";

/*The calculateTotalComments function calculates the total number of comments and their replies*/
export function calculateTotalComments(
  commentList: Comment[] | undefined
): number {
  const baseCount = commentList?.length || 0;
  const repliesCount =
    commentList?.reduce((totalReplies, comment) => {
      if (comment.replies !== undefined) {
        return totalReplies + comment.replies.length;
      }

      return 0;
    }, 0) || 0;

  return baseCount + repliesCount;
}
