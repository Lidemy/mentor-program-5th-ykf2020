import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { limit, getPosts, getPostsByPage } from "../../../WebAPI";

const Root = styled.div`
  width: 80%;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const Paginator = styled.div`
  margin-top: 20px;
  width: 100%
  display: flex;
`;

const PageButton = styled.button`
  margin: 8px;
  background: white;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 12, 34, 0.2);
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  line-height: 1.8rem;
  cursor: pointer;
  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 12, 34, 0.2);
    color: black;
    `}
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [curretPosts, setCurretPosts] = useState([]);

  const handlePageChange = (p) => {
    getPostsByPage(p).then((curretPosts) => {
      setCurretPosts(curretPosts);
      setPage(p);
    });
  };

  useEffect(() => {
    getPostsByPage(page).then((curretPosts) => {
      setCurretPosts(curretPosts);
    });
    getPosts().then((posts) => {
      const pages =
        posts.length % limit === 0
          ? posts.length / limit
          : Math.ceil(posts.length / limit);
      setTotalPages(Array.from({ length: pages }, (v, i) => i + 1));
    });
  }, [page]);

  return (
    <Root>
      {curretPosts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
      <Paginator>
        {totalPages.map((p) => (
          <PageButton
            key={p}
            $active={page === p}
            onClick={() => {
              handlePageChange(p);
            }}
          >
            {p}
          </PageButton>
        ))}
      </Paginator>
    </Root>
  );
}
