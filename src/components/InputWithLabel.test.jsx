import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputWithLabel from "./InputWithLabel";

describe("InputWithLabel", () => {
  it("should render with label and input", () => {
    const mockRegister = vi.fn().mockReturnValue({});
    render(
      <InputWithLabel
        label="Username"
        register={mockRegister}
        name="username"
        id="username"
      />
    );

    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(mockRegister).toHaveBeenCalledWith("username");
  });

  it("should render with placeholder", () => {
    const mockRegister = vi.fn().mockReturnValue({});
    render(
      <InputWithLabel
        label="Email"
        register={mockRegister}
        name="email"
        id="email"
        placeholder="Enter your email"
      />
    );

    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const mockRegister = vi.fn().mockReturnValue({});
    render(
      <InputWithLabel
        label="Password"
        register={mockRegister}
        name="password"
        id="password"
        className="custom-class"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
    expect(input).toHaveClass("border"); 
  });

  it("should render with error message", () => {
    const mockRegister = vi.fn().mockReturnValue({});
    const errorMessage = "This field is required";
    
    render(
      <InputWithLabel
        label="Username"
        register={mockRegister}
        name="username"
        id="username"
        errors={errorMessage}
      />
    );

    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("text-red-600");
  });

  it("should pass additional props to input element", () => {
    const mockRegister = vi.fn().mockReturnValue({});
    render(
      <InputWithLabel
        label="Age"
        register={mockRegister}
        name="age"
        id="age"
        type="number"
        min="18"
        max="100"
      />
    );

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("min", "18");
    expect(input).toHaveAttribute("max", "100");
  });
});