import { Link, useParams } from "react-router-dom";

function EditPostForm() {
  const { id } = useParams();

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
            <input type="text" placeholder="Post title" disabled />
          </label>
          <label>
            Body
            <textarea placeholder="Post body" rows="6" disabled />
          </label>
          <div className="form-actions">
            <Link className="button" to={`/posts/${id}`}>
              Cancel
            </Link>
            <button className="button button-primary" type="button" disabled>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditPostForm;
