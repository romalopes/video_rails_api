import React, { useState, useEffect, use } from "react";
import { API_URL } from "../../constants.js";
import { postData } from "../../data/postData.js";

function PostList() {
  // const [posts, setPosts] = useState(postData); // Initialize with mock data
  const [posts, setPosts] = useState([]); // Initialize with mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     async function fetchPosts() {
  //       setLoading(true);
  //       try {
  //         const response = await fetch(API_URL);
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setPosts(data);
  //       } catch (err) {
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchPosts();
  //   }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("API_URL:", API_URL);
        console.log("Response:", response);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
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
