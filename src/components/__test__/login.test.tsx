import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as object),
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  test("submits form with valid credentials", async () => {
    const navigate = (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<Login />);

    const emailInput = screen.getByTestId("Email");
    const passwordInput = screen.getByTestId("Password");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.type(emailInput, "test@test.com");
    userEvent.type(passwordInput, "test");
    userEvent.click(submitButton);

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("test");
  });
});
