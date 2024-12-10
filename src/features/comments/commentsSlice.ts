import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../feedback/feedback.types";
import { PayloadAction } from "@reduxjs/toolkit";

interface CommentState {
  commentList: Comment[];
}

const initialState: CommentState = {
  commentList: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentList(state, action: PayloadAction<Comment[]>) {
      //payload = comment list fetched from API
      state.commentList = action.payload;
    },
  },
});

export const { setCommentList } = commentSlice.actions;
export default commentSlice.reducer;
