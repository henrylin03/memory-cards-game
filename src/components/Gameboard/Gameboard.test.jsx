import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Gameboard from ".";
import useAllPokemon from "../../hooks/useAllPokemon";

vi.mock("../../hooks/useAllPokemon", () => ({ default: vi.fn() }));

describe("Gameboard component", () => {
  it("displays the loading screen when data is loading", () => {
    useAllPokemon.mockReturnValue({
      pokemons: [],
      error: null,
      isLoading: true,
    });

    render(<Gameboard incrementScore={() => {}} resetScore={() => {}} />);

    const loadingScreenElement = screen.getByRole("status", {
      name: /Loading/i,
    });

    expect(loadingScreenElement).toBeInTheDocument();
  });

  it("does not display Card components when data is loading", () => {
    useAllPokemon.mockReturnValue({
      pokemons: [],
      error: null,
      isLoading: true,
    });

    render(<Gameboard incrementScore={() => {}} resetScore={() => {}} />);

    const cardElements = screen.queryByRole("button", {
      name: /Select Pokemon/i,
    });

    expect(cardElements).toBeNull();
  });

  it("displays Card components of Pokemons once useAllPokemon hook has finished loading", () => {
    const MOCK_POKEMON_DATA_ARRAY = [
      { id: 1, name: "Pokemon1", imageUrl: "https://pokemon1.png" },
      { id: 2, name: "Pokemon2", imageUrl: "https://pokemon2.jpg" },
    ];
    useAllPokemon.mockReturnValue({
      pokemons: MOCK_POKEMON_DATA_ARRAY,
      error: null,
      isLoading: false,
    });

    render(<Gameboard incrementScore={() => {}} resetScore={() => {}} />);

    expect(
      screen.getAllByRole("button", { name: /Select Pokemon/i })
    ).toHaveLength(MOCK_POKEMON_DATA_ARRAY.length);
    expect(
      screen.getByRole("button", { name: /Pokemon1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Pokemon2/i })
    ).toBeInTheDocument();
  });
});

// selecting Pokemon card should update state and regenerate Pokemon displayed
// selecting previously-selected Pokemon should reset score and board
// verify error handling logic
// mock useAllPokemon hook behaviour (simulate various states)
