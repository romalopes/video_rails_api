import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants.js";
import SearchPost from "./SearchPost.jsx";
import { useNavigate } from "react-router-dom";
import {
  fetchDeletePost,
  fetchAllPosts,
} from "../../services/postServices.jsx";
import ShowPosts from "./ShowPosts.jsx";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  // const [searchInputValue, setSearchInputValue] = useUrlParam("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAllPosts(page);
        setPosts(data.posts);
        setFilteredPosts(data.posts);
        // const response = await fetch(API_URL);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const data = await response.json();
        // setPosts(data);

        setPage(data.current_page);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

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

      {!loading && !error && filteredPosts.length > 0 && (
        <div>
          <SearchPost
            onResults={setFilteredPosts}
            onClear={() => setFilteredPosts(posts)}
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          />
          <ShowPosts
            posts={filteredPosts}
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>
        // <>
        //   <div className="status-panel">
        //     <p>{posts.length} posts</p>
        //   </div>

        //   <SearchPost />
        //   <Link className="featured-post" to={`/posts/${latestPost.id}`}>
        //     <div className="featured-media" aria-hidden="true">
        //       <img src={latestPost.image_url} alt={latestPost.title} />
        //       <span>#{latestPost.id}</span>
        //     </div>
        //     <div className="featured-content">
        //       <p className="eyebrow">Latest post</p>
        //       <h2>{latestPost.title}</h2>
        //       <p>{getPostBody(latestPost)}</p>
        //       <span className="text-link">Open post</span>
        //     </div>
        //   </Link>

        //   <div className="section-heading">
        //     <h2>All Posts</h2>
        //     <span>{posts.length} posts</span>
        //   </div>

        //   <div className="post-grid">
        //     {posts.map((post) => (
        //       <div key={post.id} className="post-card-wrapper">
        //         <Link
        //           key={post.id}
        //           className="post-card"
        //           to={`/posts/${post.id}`}
        //         >
        //           <div className="post-card-media" aria-hidden="true">
        //             <img src={post.image_url} alt={post.title} />
        //             <span>#{post.id}</span>
        //           </div>
        //           <div className="post-card-body">
        //             <div className="post-meta">
        //               <span>{formatDate(post.created_at)}</span>
        //               <span>Post {post.id}</span>
        //             </div>
        //             <h3>{post.title}</h3>
        //             <p>{getPostBody(post)}</p>
        //           </div>
        //         </Link>
        //         <button
        //           className="button button-danger"
        //           onClick={() => deletePost(post.id)}
        //         >
        //           Delete Post
        //         </button>
        //       </div>
        //     ))}
        //   </div>
        // </>
      )}
    </section>
  );
}

export default PostList;
