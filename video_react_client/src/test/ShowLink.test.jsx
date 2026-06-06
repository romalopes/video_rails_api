import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import ShowLogin from "../components/ShowLogin";
import { authClient } from "../features/auth/auth";

// Mock authClient
// const mockSignOut = vi.fn();

// vi.mock("../features/auth/auth", () => ({
//   authClient: {
//     signOut: mockSignOut,
//   },
// }));
const { mockSignOut } = vi.hoisted(() => ({
  mockSignOut: vi.fn(),
}));
vi.mock("../features/auth/auth", () => ({
  authClient: {
    signOut: mockSignOut,
  },
}));

describe("ShowLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows Login/Signup link when user is null", () => {
    render(
      <MemoryRouter>
        <ShowLogin user={null} setUser={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login/Signup")).toBeInTheDocument();
  });

  test("shows user email when logged in", () => {
    render(
      <MemoryRouter>
        <ShowLogin user={{ email: "test@example.com" }} setUser={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Logged in as test@example.com/i),
    ).toBeInTheDocument();
  });

  test("shows Sign Out button when logged in", () => {
    render(
      <MemoryRouter>
        <ShowLogin user={{ email: "test@example.com" }} setUser={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /sign out/i }),
    ).toBeInTheDocument();
  });

  test("calls authClient.signOut when Sign Out is clicked", async () => {
    const setUser = vi.fn();

    render(
      <MemoryRouter>
        <ShowLogin user={{ email: "test@example.com" }} setUser={setUser} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });

  test("sets user to null after logout", async () => {
    const setUser = vi.fn();

    render(
      <MemoryRouter>
        <ShowLogin user={{ email: "test@example.com" }} setUser={setUser} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(null);
    });
  });
});
// import { render, screen } from "@testing-library/react";
// import ShowLink from "../components/ShowLogin";

// describe("ShowLogin", () => {
//   it("renders correctly", () => {
//     render(
//       <ShowLink
//         user={{ email: "test" }}
//         link={{ title: "Test Link", url: "https://example.com" }}
//       />,
//     );

//     expect(screen.getByText("Test Link")).toBeInTheDocument();
//     expect(screen.getByText("https://example.com")).toBeInTheDocument();
//   });
// });
