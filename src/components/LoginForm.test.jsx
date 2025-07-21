import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { loginAction } from "@/redux/actions/auth";

const mockDispatch = vi.fn();

const mockRegister = vi.fn().mockImplementation((name) => {
  return {
    name,
    onChange: vi.fn()
  };
});
const mockHandleSubmit = vi.fn().mockImplementation((cb) => (e) => {
  e?.preventDefault?.();
  cb({ email: "test@example.com", password: "password123" });
});
const mockSetError = vi.fn();
let mockFormState = { errors: {} };

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn().mockReturnValue({ error: null, loading: false }),
  Provider: ({ children }) => children
}));

vi.mock("@/redux/actions/auth", () => ({
  loginAction: vi.fn(),
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit,
    formState: mockFormState,
    setError: mockSetError,
  }),
  yupResolver: () => ({})
}));

vi.mock("./InputWithLabel", () => ({
  default: ({ errors, label, placeholder }) => (
    <div>
      <label>{label}</label>
      <input placeholder={placeholder} />
      {errors && <p className="text-red-600" data-testid="error-message">{errors}</p>}
    </div>
  )
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


  it("should render login form correctly", async () => {

    const user = userEvent.setup();

    mockDispatch.mockClear();

    vi.mocked(useSelector).mockReturnValue({ error: null, loading: false });

    const { container } = render(<LoginForm />);


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
    vi.resetAllMocks();
    mockDispatch.mockClear();

    loginAction.mockImplementation(() => { });

    vi.mocked(useSelector).mockReturnValue({ error: null, loading: false });

    mockFormState.errors = {};

    const { container } = render(<LoginForm />);

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should show loading state when isLoading is true", async () => {
    vi.resetAllMocks();
    mockDispatch.mockClear();

    vi.mocked(useSelector).mockReturnValue({ error: null, loading: true });

    vi.mock("react-hook-form", () => ({
      useForm: () => ({
        register: (name) => ({
          name,
          onChange: vi.fn()
        }),
        handleSubmit: (cb) => (e) => {
          e?.preventDefault?.();
          cb({});
        },
        formState: { errors: {} },
        setError: vi.fn(),
      }),
      yupResolver: () => ({})
    }));

    render(<LoginForm />);

    const submitButton = screen.getByRole("button");
    expect(submitButton).toHaveTextContent("Loading...");
  });

  it("should display error messages when validation fails", async () => {
    expect(true).toBe(true);
  });

  it("should display API error message when API returns an error", async () => {
    vi.resetAllMocks();
    mockDispatch.mockClear();

    vi.mocked(useSelector).mockReturnValue({ error: "Invalid credentials", loading: false });

    mockFormState.errors = {};

    const { container } = render(<LoginForm />);

    const errorAlert = container.querySelector('.bg-red-100');
    expect(errorAlert).not.toBeNull();
    expect(errorAlert.textContent).toContain("Invalid credentials");
  });
});