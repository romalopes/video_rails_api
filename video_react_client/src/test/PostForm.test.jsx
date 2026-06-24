import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import PostForm from "../features/posts/PostForm";
import { updatePost, fetchPostDetails } from "../services/postServices.jsx";

vi.mock("../services/postServices.jsx", () => ({
  fetchPostDetails: vi.fn(),
  createPost: vi.fn(),
  updatePost: vi.fn(),
}));

describe("PostForm", () => {
  test("renders the form", () => {
    render(
      <MemoryRouter>
        <PostForm />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("Add a post title")).toBeInTheDocument();
  });

  test("renders the form with the correct title", () => {
    render(
      <MemoryRouter>
        <PostForm />
      </MemoryRouter>,
    );
    expect(
      screen.getByPlaceholderText("Write the post body"),
    ).toBeInTheDocument();
  });

  test("renders the form fields", () => {
    render(
      <MemoryRouter>
        <PostForm
          headerText="Edit Post"
          buttonText="Save Changes"
          onSubmit={() => {}}
        />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Edit Post")).toHaveLength(1);
    // expect(screen.getAllByText("Edit Post")).toBeInTheDocument();
  });

  test("calls PostFrom for editing", () => {
    const mockDataPost = {
      id: 1,
      title: "Test Post 1",
      body: "Test content 1",
    };

    fetchPostDetails.mockResolvedValue(mockDataPost);

    render(
      <MemoryRouter>
        <PostForm
          post={mockDataPost}
          id={mockDataPost.id}
          headerText="Edit Post"
          buttonText="Save Changes"
          onSubmit={() => {}}
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Test Post 1")).toHaveLength(1);
    expect(screen.getByRole("textbox", { name: "Body" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Post 1")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Test content 1")).toBeInTheDocument();
  });

  test("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(
      <MemoryRouter>
        <PostForm
          headerText="New Post"
          buttonText="Create Post"
          onSubmit={mockSubmit}
        />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Title" }),
      "My First Post",
    );

    await user.type(
      screen.getByRole("textbox", { name: "Body" }),
      "This is the content",
    );

    await user.click(screen.getByRole("button", { name: "Create Post" }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);

    expect(mockSubmit).toHaveBeenCalledWith({
      title: "My First Post",
      body: "This is the content",
    });
  });

  test("submits edited post", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(
      <MemoryRouter>
        <PostForm
          post={{
            title: "Old Title",
            body: "Old Body",
          }}
          headerText="Edit Post"
          buttonText="Save Changes"
          onSubmit={mockSubmit}
        />
      </MemoryRouter>,
    );

    const titleInput = screen.getByDisplayValue("Old Title");

    await user.clear(titleInput);
    await user.type(titleInput, "New Title");

    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: "New Title",
      body: "Old Body",
    });
  });
});
