import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/library/i);
  expect(linkElement).toBeTruthy();
});
