import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "../features/posts/PostList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm";
import EditPostForm from "../features/posts/EditPostForm";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPostForm />} />
        <Route path="/new" element={<NewPostForm />} />
        {/* <Route path="/new" element={<h1>New Post</h1>} /> */}
      </Routes>
    </>
  );
}

export default AppRoutes;
