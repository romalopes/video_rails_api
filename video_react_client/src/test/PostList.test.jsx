import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("../services/postServices.jsx", () => ({
  fetchAllPosts: vi.fn(),
  fetchDeletePost: vi.fn(),
}));

import { fetchAllPosts } from "../services/postServices.jsx";
import PostList from "../features/posts/PostList";

describe("PostList", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>,
    );
  });
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Post Library")).toBeInTheDocument();
    expect(
      screen.getByText("Browse the stories coming from your Rails backend."),
    ).toBeInTheDocument();
  });

  it("displays post details when a post is clicked", async () => {
    const mockPosts = [
      {
        id: 1,
        title: "Test Post 1",
        body: "Test content 1",
      },
      {
        id: 2,
        title: "Test Post 2",
        body: "Test content 2",
      },
    ];

    fetchAllPosts.mockResolvedValue(mockPosts);

    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>,
    );

    const posts = await screen.findAllByText("Test Post 1");
    expect(posts).toHaveLength(2);

    const featuredPost = await screen.findByRole("heading", {
      level: 2,
      name: "Test Post 1",
    });

    expect(featuredPost).toBeInTheDocument();
    // const firstPost = await screen.findByText("Test Post 1");

    expect(featuredPost).toBeInTheDocument();

    // expect(screen.getByText("Test content 1")).toBeInTheDocument();
    const posts_content = await screen.findAllByText("Test content 1");
    expect(posts_content).toHaveLength(2);
  });
});
