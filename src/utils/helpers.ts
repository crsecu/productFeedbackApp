import { Comment } from "../features/feedback/feedback.types";
import { User } from "../features/user/user.types";
import { fetchUserList } from "../services/apiFeedback";

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

/* The validateUserCredentials function fetches the user list from mock API and validates the input credentials
 */
export async function validateUserCredentials(name: string, username: string) {
  const userList: User[] = await fetchUserList();

  const validatedUser = userList.find((user) => {
    return (
      user.name.toLowerCase() === name.toLocaleLowerCase() &&
      user.username.toLowerCase() === username.toLowerCase()
    );
  });

  return validatedUser;
}
