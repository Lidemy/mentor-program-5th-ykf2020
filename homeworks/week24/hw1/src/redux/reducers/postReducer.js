import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  addPost,
  deletePost as deletePostAPI,
  editPost as editPostAPI,
} from "../../WebAPI.js";

const initialState = {
  isLoadingPost: false,
  post: {},

  newPostResponse: null,
  editPostResponse: null,
};

export const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingPost, setPost, setNewPostResponse } =
  postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id).then((res) => {
    dispatch(setPost(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const newPost = (title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  addPost(title, body).then((res) => {
    dispatch(setNewPostResponse(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const editPost = (id, editTitle, editBody) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  editPostAPI(id, editTitle, editBody).then((res) => {
    dispatch(setPost(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const deletePost = (id) => (dispatch) => {
  return deletePostAPI(id).then((res) => {
    return res;
  });
};

export default postReducer.reducer;
