import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

import { describe, expect, test } from "vitest";
import characters from "./testing/mock/characters";

describe("<App />", () => {
  describe("loading character", () => {
    test('renders the title "Characters"', async () => {
      render(<App />);
      expect(screen.getByText("Characters")).toBeInTheDocument();
    });
    test("renders a list of 10 characters", async () => {
      render(<App />);
      // any find() is a promise function that waits for the text to appear on the DOM, but get() expects the text to be there already
      const characterElements = await screen.findAllByText("name");
      expect(characterElements).toHaveLength(10);
    });
  });
  describe("loading more characters", () => {
    test('has a "Load More Characters" button', async () => {
      render(<App />);
      const buttonElement = screen.getByRole("button", {
        name: "Load More Characters",
      });
      expect(buttonElement).toBeInTheDocument();
    });
    test("clicking load more gets 10 more characters", async () => {
      render(<App />);
      const buttonElement = screen.getByRole("button", {
        name: "Load More Characters",
      });
      fireEvent.click(buttonElement);

      const secondPageFirstName = await screen.findByText("The waif");
      expect(secondPageFirstName).toBeInTheDocument();
    });
    test("clicking load more increases the page number", async () => {
      render(<App />);
      const buttonElement = screen.getByRole("button", {
        name: "Load More Characters",
      });
      fireEvent.click(buttonElement);
      const pageNumberText = screen.getByText("Next Page: 2");
      expect(pageNumberText).toBeInTheDocument();
    });
  });
});
