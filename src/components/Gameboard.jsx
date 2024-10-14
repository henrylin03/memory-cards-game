import { useState } from "react";
import "../styles/gameboard.css";
import Card from "./Card";

const getRandomId = (maxId = 150) => Math.floor(Math.random() * maxId + 1);

export default function Gameboard() {
  const [pokemonIds, setPokemonIds] = useState(getRandomPokemonIds());
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(() => new Set());

  function getRandomPokemonIds() {
    let ids = new Set();
    for (let i = 0; i < 10; i++) {
      let randomId = getRandomId();
      while (ids.has(randomId)) randomId = getRandomId();
      ids.add(randomId);
    }

    return [...ids];
  }

  function handleCardSelection(pokemonId) {
    if (selectedPokemonIds.has(pokemonId)) {
      alert("this pokemon has been selected before. you lose.");
      setSelectedPokemonIds(() => new Set());
    } else
      setSelectedPokemonIds(() => new Set(selectedPokemonIds).add(pokemonId));

    setPokemonIds(getRandomPokemonIds());
  }

  const gameCards = pokemonIds.map((pokemonId) => (
    <Card
      key={pokemonId}
      id={pokemonId}
      handleCardSelection={handleCardSelection}
    />
  ));

  return <section className="gameboard">{gameCards}</section>;
}

/* HOW THE GAME WILL WORK (ROUGHLY) */
// there is a list of pokemon ids initially
// when a user clicks (mousedown) on a card, that pokemon's id is logged in a state, and all pokemons are shuffled (position (index in pokemonIds) cannot be the same).
// if that pokemon id has already been clicked before, the score resets. if not selected yet, the score is incremented. if then this is a new high score, then the high score reflects that too.
// when the new 10 pokemons are shown, max 5 (half of total cards shown) cards that the user has selected. in the future, if we let the user choose the difficulty level, then a higher proportion (up to 9 out of 10) cards will be ones the user has selected.
