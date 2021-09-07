import React, { useState, useEffect, useContext } from "react";
import { addPost } from "../../../WebAPI.js";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts.js";

export default function AddPage() {
  const { user } = useContext(AuthContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    addPost(postTitle, postBody).then((data) => {
      history.push("/");
    });
  };

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
