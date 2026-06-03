import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../constants.js";
import React from "react";
import { useEffect, useState } from "react";

function EditPostForm() {
  const [post, setPost] = React.useState(null);
  const { id } = useParams();
  const postUrl = `${API_URL}/${id}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fechCurrentPost = async () => {
      try {
        const response = await fetch(postUrl);
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
    fechCurrentPost();
  }, [id]);

  //   fetch(postUrl)
  //     .then((response) => response.json())
  //     .then((data) => setPost(data))
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, [postUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(postUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className="form-shell">
      <div className="form-panel">
        <p className="eyebrow">Edit post {id}</p>
        <h1>Edit Post</h1>
        <p className="page-subtitle">
          This route is ready for the Rails update flow.
        </p>

        <form className="post-form">
          <label>
            Title
            <input
              type="text"
              placeholder="Post title"
              value={post?.title || ""}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </label>
          <label>
            Body
            <textarea
              placeholder="Post body"
              rows="6"
              value={post?.body || ""}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
            />
          </label>
          <div className="form-actions">
            <Link className="button" to={`/posts/${id}`}>
              Cancel
            </Link>
            <button
              className="button button-primary"
              type="submit"
              disabled={!post?.title}
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditPostForm;
