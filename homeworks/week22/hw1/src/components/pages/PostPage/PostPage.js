import React, { useState, useEffect } from "react";
import { getPost } from "../../../WebAPI";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((p) => setPost(p));
  });

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
      <p>author: {post.userId}</p>
    </>
  );
}
