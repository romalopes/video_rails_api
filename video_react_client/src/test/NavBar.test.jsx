import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { vi } from "vitest";

test("shows Login button when user is null", () => {
  render(
    <MemoryRouter>
      <NavBar user={null} />
    </MemoryRouter>,
  );

  expect(
    screen.getByText((content, element) => {
      return content.includes("Login");
      return false;
    }),
  ).toBeInTheDocument();
});

test("shows Logout button when user is defined", () => {
  render(
    <MemoryRouter>
      <NavBar user={{ email: "test" }} />
    </MemoryRouter>,
  );

  expect(
    screen.getByText((content, element) => {
      return content.includes("Logged in");
      return false;
    }),
  ).toBeInTheDocument();
});

describe("NavBar", () => {
  it("renders navigation items", () => {
    render(
      <MemoryRouter>
        <NavBar user={{ email: "test" }} />
      </MemoryRouter>,
    );
    const navigationItems = [
      "Library",
      "New Post",
      "Video Journal",
      "Rails API client",
      //   "Register",
      //   "Logout",
    ];

    navigationItems.forEach((item) => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("renders Login button when user is null", () => {
    render(
      <MemoryRouter>
        <NavBar user={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login/Signup")).toBeInTheDocument();
  });

  it("renders Logout button when user is defined", () => {
    render(
      <MemoryRouter>
        <NavBar user={{ email: "test" }} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("Library link points to home", () => {
    render(
      <MemoryRouter>
        <NavBar user={{ email: "test" }} />
      </MemoryRouter>,
    );

    const libraryLink = screen.getByRole("link", {
      name: "Library",
    });

    expect(libraryLink).toHaveAttribute("href", "/");
  });

  it("New Post link points to new", () => {
    render(
      <MemoryRouter>
        <NavBar user={{ email: "test" }} />
      </MemoryRouter>,
    );

    const newPostLink = screen.getByRole("link", {
      name: "New Post",
    });

    expect(newPostLink).toHaveAttribute("href", "/new");
  });

  //   it("calls logout when Sign Out is clicked", async () => {
  //     const mockLogout = vi.fn();

  //     render(
  //       <MemoryRouter>
  //         <NavBar user={{ email: "test@test.com" }} onLogout={mockLogout} />
  //       </MemoryRouter>,
  //     );

  //     await userEvent.click(screen.getByRole("button", { name: /sign out/i }));

  //     expect(mockLogout).toHaveBeenCalledTimes(1);
  //   });
});
