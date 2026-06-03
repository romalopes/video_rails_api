import { Link } from "react-router-dom";

function NewPostForm() {
  return (
    <section className="form-shell">
      <div className="form-panel">
        <p className="eyebrow">Create</p>
        <h1>New Post</h1>
        <p className="page-subtitle">
          This route is ready for the Rails create flow.
        </p>

        <form className="post-form">
          <label>
            Title
            <input type="text" placeholder="Add a post title" disabled />
          </label>
          <label>
            Body
            <textarea placeholder="Write the post body" rows="6" disabled />
          </label>
          <div className="form-actions">
            <Link className="button" to="/">
              Cancel
            </Link>
            <button className="button button-primary" type="button" disabled>
              Create Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewPostForm;
