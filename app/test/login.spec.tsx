import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../src/components/organisms/loginForm";
import { Providers } from "../src/app/providers"; //
import Login from "../src/app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

describe("Login Form", () => {
  it("renders without crashing", () => {
    render(
      <Providers>
        <LoginForm />
      </Providers>
    );
  });
});

describe("Login Page", () => {
  it("renders without crashing", () => {
    render(
      <Providers>
        <Login />
      </Providers>
    );
  });
});

it("has username and password input fields", () => {
  render(
    <Providers>
      <LoginForm />
    </Providers>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
});

it("has a submit button", () => {
  render(
    <Providers>
      <LoginForm />
    </Providers>
  );
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
});


it("renders header", () => {
  render(
    <Providers>
      <Login />
    </Providers>
  );
  expect(screen.getByText(/tracking app/i)).toBeInTheDocument();
});


