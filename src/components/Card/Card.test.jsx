import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from ".";

describe("Card component", () => {
  const MOCK_POKEMON_DATA = { id: 404, name: "Pokemon", imageUrl: "" };

  it("should render a clickable card with an image and text", () => {
    render(
      <Card
        pokemonData={MOCK_POKEMON_DATA}
        handleCardSelection={() => {}}
        isLoading={false}
      />
    );

    const cardElement = screen.getByRole("button", { name: /Pokemon/i });
    const pokemonNameElement = screen.getByText(/Pokemon/i);
    const pokemonImageElement = screen.getByRole("img", { name: /Pokemon/i });

    expect(cardElement).toBeInTheDocument();
    expect(pokemonNameElement).toBeInTheDocument();
    expect(pokemonImageElement).toBeInTheDocument();
  });

  /* NB: I have opted not to test that event handler _has_ been clicked on event, because this will handled in testing functionality once clicked at the App.test.jsx level */

  it("should not call event handler prop if mousedown event has not happened, nor when Card component is loading", async () => {
    const mockHandlerFunction = vi.fn();
    const user = userEvent.setup();

    render(
      <Card
        handleCardSelection={mockHandlerFunction}
        pokemonData={MOCK_POKEMON_DATA}
        isLoading={true}
      />
    );

    expect(mockHandlerFunction).not.toHaveBeenCalled();

    const cardElement = screen.getByRole("button", { name: /Pokemon/i });
    await user.click(cardElement);
    expect(mockHandlerFunction).not.toHaveBeenCalled();
  });
});
