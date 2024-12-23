import { createSlice } from "@reduxjs/toolkit";
import { CommentListType } from "../../types/comment.types";
import { PayloadAction } from "@reduxjs/toolkit";

interface CommentState {
  commentList: CommentListType;
}

const initialState: CommentState = {
  commentList: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentList(state, action: PayloadAction<CommentListType>) {
      //payload = comment list fetched from API
      state.commentList = action.payload;
    },
  },
});

export const { setCommentList } = commentSlice.actions;
export default commentSlice.reducer;
