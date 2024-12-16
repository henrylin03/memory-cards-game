import { describe, expect, it } from "vitest";
import { getRandomPokemonIds } from ".";

describe.each(Array.from({ length: 5 }, () => getRandomPokemonIds()))(
  "Helper function to generate random Pokemon IDs",
  () => {
    it("never generates any duplicate IDs", (randomPokemonIds) => {
      const isArrayWithUniqueElements = (arr) =>
        Array.isArray(arr) && new Set(arr).size === arr.length;

      expect(isArrayWithUniqueElements(randomPokemonIds)).toBeTruthy;
    });
  }
);
