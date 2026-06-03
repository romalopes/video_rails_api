import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants.js";

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

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const latestPost = posts[0];

  return (
    <section className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Video Rails API</p>
          <h1>Post Library</h1>
          <p className="page-subtitle">
            Browse the stories coming from your Rails backend.
          </p>
        </div>
        <Link className="button button-primary" to="/new">
          New Post
        </Link>
      </header>

      {loading && (
        <div className="status-panel">
          <span className="loader" aria-hidden="true" />
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="status-panel status-panel-error">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>Create the first post to start filling the library.</p>
          <Link className="button button-primary" to="/new">
            New Post
          </Link>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <Link className="featured-post" to={`/posts/${latestPost.id}`}>
            <div className="featured-media" aria-hidden="true">
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
              <Link key={post.id} className="post-card" to={`/posts/${post.id}`}>
                <div className="post-card-media" aria-hidden="true">
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
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default PostList;
