import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../constants.js";
import React from "react";
import { useEffect, useState } from "react";
import { updatePost, fetchPostDetails } from "../../services/postServices.jsx";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm.jsx";

function EditPostForm() {
  const [post, setPost] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const postUrl = `${API_URL}/${id}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fechCurrentPost = async () => {
      try {
        const data = await fetchPostDetails(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fechCurrentPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleUpdateSubmit = async (rawData) => {
    try {
      const formData = new FormData();
      formData.append("post[title]", rawData.title);
      formData.append("post[body]", rawData.body);
      formData.append("post[image]", rawData.image);

      const data = await updatePost(id, formData);
      console.log("Updated post:", data);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <PostForm
      post={post}
      id={id}
      headerText="Edit Post"
      onSubmit={handleUpdateSubmit}
      buttonText="Save Changes"
    />
    // <section className="form-shell">
    //   <div className="form-panel">
    //     <p className="eyebrow">Edit post {id}</p>
    //     <h1>Edit Post</h1>
    //     <p className="page-subtitle">
    //       This route is ready for the Rails update flow.
    //     </p>

    //     <form className="post-form">
    //       <label>
    //         Title
    //         <input
    //           type="text"
    //           placeholder="Post title"
    //           value={post?.title || ""}
    //           onChange={(e) => setPost({ ...post, title: e.target.value })}
    //         />
    //       </label>
    //       <label>
    //         Body
    //         <textarea
    //           placeholder="Post body"
    //           rows="6"
    //           value={post?.body || ""}
    //           onChange={(e) => setPost({ ...post, body: e.target.value })}
    //         />
    //       </label>
    //       <div className="form-actions">
    //         <Link className="button" to={`/posts/${id}`}>
    //           Cancel
    //         </Link>
    //         <button
    //           className="button button-primary"
    //           type="submit"
    //           disabled={!post?.title}
    //           onClick={handleSubmit}
    //         >
    //           Save Changes
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
}

export default EditPostForm;
