import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants.js";
import SearchPost from "./SearchPost.jsx";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination.jsx";

function getPostBody(post) {
  return post.body || post.content || "No description has been added yet.";
}

function formatDate(value) {
  if (!value) return "Draft";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function ShowPosts({ posts, page, totalPages, onPageChange }) {
  const latestPost = posts[0];
  return (
    <>
      <div className="status-panel">
        <p>{posts.length} posts</p>
      </div>

      <Link className="featured-post" to={`/posts/${latestPost.id}`}>
        <div className="featured-media" aria-hidden="true">
          <img src={latestPost.image_url} alt={latestPost.title} />
          <span>#{latestPost.id}</span>
        </div>
        <div className="featured-content">
          <p className="eyebrow">Latest post</p>
          <h2>{latestPost.title}</h2>
          <p>{getPostBody(latestPost)}</p>
          <span className="text-link">Open post</span>
        </div>
      </Link>

      <div className="section-heading">
        <h2>All Posts</h2>
        <span>{posts.length} posts</span>
      </div>

      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card-wrapper">
            <Link key={post.id} className="post-card" to={`/posts/${post.id}`}>
              <div className="post-card-media" aria-hidden="true">
                <img src={post.image_url} alt={post.title} />
                <span>#{post.id}</span>
              </div>
              <div className="post-card-body">
                <div className="post-meta">
                  <span>{formatDate(post.created_at)}</span>
                  <span>Post {post.id}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{getPostBody(post)}</p>
              </div>
            </Link>
            <button
              className="button button-danger"
              onClick={() => deletePost(post.id)}
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
export default ShowPosts;
