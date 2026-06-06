import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants.js";

async function fetchAllPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch posts: ${err.message}`);
  }
}

async function fetchPostDetails(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch post details: ${err.message}`);
  }
}

async function updatePost(id, postData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Failed to edit post: ${err.message}`);
  }
}

// const deletePost = async (id) => {
async function fetchDeletePost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // return response.json();
  } catch (err) {
    alert(`Failed to delete post: ${err.message}`);
  }
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

async function createPost(postData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Failed to create post: ${err.message}`);
  }
}
export {
  fetchPostDetails,
  createPost,
  fetchAllPosts,
  fetchDeletePost,
  updatePost,
};
