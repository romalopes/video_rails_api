import { Route, Routes } from "react-router-dom";
import PostList from "../features/posts/PostList";
import PostDetails from "../features/posts/PostDetails";
import NewPostForm from "../features/posts/NewPostForm";
import EditPostForm from "../features/posts/EditPostForm";
import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
// import LoginSignupForm from "../features/auth/LoginSignupForm";

function AppRoutes({ user, setUser }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPostForm />} />
        <Route path="/new" element={<NewPostForm />} />
        <Route
          path="/login"
          element={<LoginForm user={user} setUser={setUser} />}
        />
        <Route path="/new" element={<h1>New Post</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
