import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants.js";

function getPostBody(post) {
  console.log(post.image_url);
  return post.body || post.content || "No description has been added yet.";
}

function formatDate(value) {
  if (!value) return "Draft";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="page-stack">
        <div className="status-panel">
          <span className="loader" aria-hidden="true" />
          <p>Loading post...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-stack">
        <div className="status-panel status-panel-error">
          <p>Error: {error}</p>
          <button className="button" onClick={() => navigate("/")}>
            Back to Library
          </button>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="page-stack">
        <div className="empty-state">
          <h1>Post not found</h1>
          <Link className="button button-primary" to="/">
            Back to Library
          </Link>
        </div>
      </section>
    );
  }

  // function deletePost(id) {
  //   if (window.confirm("Are you sure you want to delete this post?")) {
  //     fetch(`${API_URL}/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         navigate("/");
  //       })
  //       .catch((err) => alert(`Failed to delete post: ${err.message}`));
  //   }
  // }

  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          navigate("/");
        })
        .catch((err) => alert(`Failed to delete post: ${err.message}`));
    }
  };

  return (
    <article className="post-detail">
      <div className="detail-hero">
        <div className="detail-media" aria-hidden="true">
          <img src={post.image_url} alt={post.title} />
          <span>#{post.id}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Post {post.id}</p>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>Published {formatDate(post.created_at)}</span>
            <span>Updated {formatDate(post.updated_at)}</span>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <p>{getPostBody(post)}</p>
      </div>

      <div className="detail-actions">
        <button className="button" onClick={() => navigate("/")}>
          Back to Library
        </button>
        <Link className="button button-primary" to={`/posts/${id}/edit`}>
          Edit Post
        </Link>
        <button className="button button-danger" onClick={() => deletePost(id)}>
          Delete Post
        </button>
      </div>
    </article>
  );
}

export default PostDetails;
