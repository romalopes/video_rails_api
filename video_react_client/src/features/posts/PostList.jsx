import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants.js";
import { useNavigate } from "react-router-dom";
import {
  fetchDeletePost,
  fetchAllPosts,
} from "../../services/postServices.jsx";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAllPosts();
        setPosts(data);
        // const response = await fetch(API_URL);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const data = await response.json();
        // setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await fetchDeletePost(id);
        // const response = await fetch(`${API_URL}/${id}`, {
        //   method: "DELETE",
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        alert(`Failed to delete post: ${err.message}`);
      }
    }
  };

  // const deletePost = (id) => {
  //   if (window.confirm("Are you sure you want to delete this post?")) {
  //     fetch(`${API_URL}/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         // navigate("/");
  //         // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  //         setPosts(posts.filter((post) => post.id !== id));
  //       })
  //       .catch((err) => alert(`Failed to delete post: ${err.message}`));
  //   }
  // };

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
              <p>
                {/* <img src={latestPost.image_url} alt={latestPost.title} /> */}
              </p>
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
                <Link
                  key={post.id}
                  className="post-card"
                  to={`/posts/${post.id}`}
                >
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
        </>
      )}
    </section>
  );
}

export default PostList;
