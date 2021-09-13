import React, { useState, useEffect } from "react";
import {
  newPost,
  setNewPostResponse,
} from "../../../redux/reducers/postReducer";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function AddPage() {
  const dispatch = useDispatch();
  const newPostResponse = useSelector((store) => store.posts.newPostResponse);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();
  const user = useSelector((store) => store.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newPost(postTitle, postBody));
  };

  useEffect(() => {
    if (newPostResponse && newPostResponse.id) {
      history.push("/posts/" + newPostResponse.id);
    }
    return () => {
      dispatch(setNewPostResponse(null));
    };
  }, [newPostResponse, history, dispatch]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <>
      <h2>新增文章</h2>
      <form onSubmit={handleSubmit}>
        <h3>文章標題</h3>
        <input
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <h3>文章內容</h3>
        <textarea
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
        <button type="submit"> 送出 </button>
      </form>
    </>
  );
}
