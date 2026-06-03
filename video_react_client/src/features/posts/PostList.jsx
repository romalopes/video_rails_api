import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { postData } from "../../data/PostData";

function PostList() {
  const [posts, setPosts] = useState(postData); // Initialize with mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    // Fetch posts from the API and display them here

    <div>
      <h2>Post List</h2>
      {posts.length > 0 ? (
        <>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          {posts.map((post) => (
            <div key={post.id} className="post-container">
              <h2>
                {/* <Link to={`/posts/${post.id}`}> */}
                {post.id} - {post.title}
                {/* </Link>s */}
              </h2>
            </div>
          ))}
        </>
      ) : (
        <p>No posts available.</p>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default PostList;
