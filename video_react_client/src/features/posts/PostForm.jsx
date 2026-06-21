import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants.js";

function PostForm({ post, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    post || {
      title: "",
      body: "",
    },
  );

  return (
    <div>
      <h1>{headerText}</h1>
      <h2>{formData.title}</h2>
      <p>{formData.body}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("onSubmit", formData);
          onSubmit(formData);
        }}
      >
        <div>
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              placeholder="Add a post title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </label>
          <label htmlFor="body">
            Body
            <textarea
              id="body"
              value={formData.body}
              placeholder="Write the post body"
              rows="6"
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
            />
          </label>
          <div className="form-actions">
            <Link className="button" to="/">
              Cancel
            </Link>
            <button
              className="button button-primary"
              type="submit"
              disabled={!formData.title}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  post: null,
  headerText: "New Post",
  buttonText: "Create Post",
};

export default PostForm;
