import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../constants.js";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postServices.jsx";
import PostForm from "./PostForm.jsx";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // const handleSubmit = async (e) => {
  //   // e.preventDefault();
  //   setIsSubmitting(true);
  //   setError(null);

  //   const postData = { title, body };
  //   try {
  //     const data = await createPost(postData);
  //     // const data = await response.json();
  //     console.log("Created post:", data);
  //     navigate(`/posts/${data.id}`);

  //     // const response = await fetch(`${API_URL}`, {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify(postData),
  //     //   // body: JSON.stringify({ title, body }),
  //     // });

  //     // if (!response.ok) {
  //     //   throw new Error(`HTTP error! status: ${response.status}`);
  //     // }
  //     // //   if (response.ok) {
  //     // const data = await response.json();
  //     // console.log("Created post:", data);
  //     // navigate(`/posts/${data.id}`);
  //     //   }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleCreateSubmit = async (rawData) => {
    // e.preventDefault();
    // create the form data
    console.log("rawData", rawData);
    const formData = new FormData();
    formData.append("post[title]", rawData.title);
    formData.append("post[body]", rawData.body);
    formData.append("post[image]", rawData.image);

    console.log(formData);
    try {
      const data = await createPost(formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <PostForm
      post={null}
      headerText="New Post"
      onSubmit={handleCreateSubmit}
      buttonText="Create Post"
    />
    // <section className="form-shell">
    //   <div className="form-panel">
    //     <p className="eyebrow">Create</p>
    //     <h1>New Post</h1>
    //     <p className="page-subtitle">
    //       This route is ready for the Rails create flow.
    //     </p>

    //     <form onSubmit={handleSubmit} className="post-form">
    //       <label htmlFor="title">
    //         Title - {API_URL}
    //         <input
    //           htmlFor="title"
    //           type="text"
    //           placeholder="Add a post title"
    //           value={title}
    //           onChange={(e) => setTitle(e.target.value)}
    //         />
    //       </label>
    //       <label htmlFor="body">
    //         Body
    //         <textarea
    //           htmlFor="body"
    //           value={body}
    //           placeholder="Write the post body"
    //           rows="6"
    //           onChange={(e) => setBody(e.target.value)}
    //         />
    //       </label>
    //       <div className="form-actions">
    //         <Link className="button" to="/">
    //           Cancel
    //         </Link>
    //         <button
    //           className="button button-primary"
    //           type="submit"
    //           disabled={!title}
    //         >
    //           Create Post
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
}

export default NewPostForm;
