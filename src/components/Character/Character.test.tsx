import { describe, expect, test } from "vitest";
import Character from "./Character";
import { render, screen } from "@testing-library/react";
import characters from "../../testing/mock/characters";
import '@testing-library/jest-dom'



describe("<Character />", () => {
  test('shows fields for "name" and "culture"', async () => {
    render(<Character character={characters[0]}/>);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("culture")).toBeInTheDocument();
  });
  test("shows culture if it is present", async () => {
    render(<Character character={characters[0]} />);
    expect(screen.getByText("Braavosi")).toBeInTheDocument();
  });
  test("shows alias if no name is present", async () => {
    render(<Character character={characters[2]} />);
    expect(screen.getByText("Lamprey")).toBeInTheDocument();
  });
  test("shows how many books this characters made an appearance in", async () => {
    render(<Character character={characters[1]} />);
    const element = screen.getByText(/Number of Books:/)
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("STRONG");

    const parent = element.closest("div");
    expect(parent).toHaveTextContent("Number of Books: 5");
  });
});
