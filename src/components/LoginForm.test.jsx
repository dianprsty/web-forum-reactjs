import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { loginAction } from "@/redux/actions/auth";

vi.mock("react-redux", () => ({
  useDispatch: () => vi.fn().mockReturnValue(vi.fn()),
  useSelector: vi.fn(),
  Provider: ({ children }) => children
}));

vi.mock("@/redux/actions/auth", () => ({
  loginAction: vi.fn(),
}));

let mockFormState = {
  errors: {},
  isLoading: false,
};

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: (name) => ({ name }),
    handleSubmit: (cb) => (data) => cb(data),
    formState: mockFormState,
  }),
}));

vi.mock("react-router-dom", () => {
  const Link = ({ children, to }) => <a href={to}>{children}</a>;

  Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
  };

  return {
    Link
  };
});

describe("LoginForm", () => {
  beforeEach(() => {

    mockFormState = {
      errors: {},
      isLoading: false,
    };
    vi.clearAllMocks();
  });


  const mockStore = {
    getState: vi.fn(),
    subscribe: vi.fn(),
    dispatch: vi.fn()
  };

  it("should render login form correctly", async () => {

    const user = userEvent.setup();

    const { container } = render(<Provider store={mockStore}><LoginForm /></Provider>);


    expect(screen.getByRole("heading", { level: 1, name: "Login" })).toBeInTheDocument();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();


    await user.click(emailInput);
    await user.click(passwordInput);


    const loginButton = screen.getByRole("button");
    expect(loginButton).toHaveTextContent("Login");


    const paragraphElement = container.querySelector('p.text-white');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.textContent).toContain("Don");
    expect(paragraphElement.textContent).toContain("have an account");


    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/auth/register");


    await user.hover(registerLink);
  });

  it("should call loginAction when form is submitted", async () => {

    const user = userEvent.setup();

    render(<LoginForm />);


    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button");


    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");


    await user.click(submitButton);


    expect(loginAction).toHaveBeenCalled();
  });

  it("should show loading state when isLoading is true", async () => {

    const user = userEvent.setup();


    mockFormState = {
      errors: {},
      isLoading: true,
    };

    render(<LoginForm />);


    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button");


    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");


    expect(submitButton).toHaveTextContent("Loading...");
  });

  it("should display error messages when validation fails", async () => {

    const user = userEvent.setup();


    mockFormState = {
      errors: {
        email: { message: "Email wajib diisi" },
        password: { message: "Password wajib diisi" },
      },
      isLoading: false,
    };

    render(<LoginForm />);


    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button");


    await user.click(submitButton);


    expect(screen.getByText("Email wajib diisi")).toBeInTheDocument();
    expect(screen.getByText("Password wajib diisi")).toBeInTheDocument();
  });
});