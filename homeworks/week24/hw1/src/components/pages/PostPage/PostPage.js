import React, { useEffect, useState } from "react";
import { editPost, deletePost } from "../../../redux/reducers/postReducer";
import { getPost } from "../../../redux/reducers/postReducer";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const handleDeletePost = (id) => {
    dispatch(deletePost(id)).then((deleteRes) => {
      history.push("/");
    });
  };

  const toggleEditArea = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    dispatch(editPost(id, editTitle, editBody));
    setIsEditing(false);
  };

  return (
    <>
      {user && (
        <>
          <button onClick={() => handleDeletePost(id)}>刪除文章</button>
          <button onClick={toggleEditArea}>編輯文章</button>
        </>
      )}
      <h2>{post ? post.title : ""}</h2>
      <p>{post ? post.body : ""}</p>
      <p>{post ? new Date(post.createdAt).toLocaleString() : ""}</p>
      <p>author: {post ? post.userId : ""}</p>

      {isEditing && (
        <div>
          <h2>編輯文章</h2>
          <form>
            <h3>文章標題</h3>
            <input
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <h3>文章內容</h3>
            <textarea
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
              }}
            />
            <button type="button" onClick={handleEditSubmit}>
              {" "}
              送出{" "}
            </button>
            <button type="button" onClick={toggleEditArea}>
              {" "}
              取消{" "}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
