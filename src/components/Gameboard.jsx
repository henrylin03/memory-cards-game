import { useState } from "react";
import Card from "./Card";
import "../styles/gameboard.css";

const getRandomId = (maxId = 150) => Math.floor(Math.random() * maxId + 1);

// schwartzian transform
const shuffleElements = (array) =>
  array
    .map((element) => ({ element, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ element }) => element);

const randomlySelectElements = (array, elementsCount) => {
  const shuffledArray = shuffleElements(array);
  return shuffledArray.slice(0, elementsCount);
};

export default function Gameboard({ incrementScore, resetScore }) {
  const TOTAL_IDS = 10;
  const [pokemonIds, setPokemonIds] = useState(getRandomPokemonIds());
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());

  function getRandomPokemonIds() {
    let ids = [];
    for (let i = 0; i < TOTAL_IDS; i++) {
      let randomId = getRandomId();
      while (ids.includes(randomId)) randomId = getRandomId();
      ids.push(randomId);
    }

    return [...ids];
  }

  function regeneratePokemonIds(selectedPokemonId) {
    const MAX_IDS_OF_POKEMONS_ALREADY_SELECTED = 5;
    let pokemonIds = [];

    // need to add 1 because selectedPokemonIds state has not updated yet here
    if (selectedPokemonIds.size + 1 > MAX_IDS_OF_POKEMONS_ALREADY_SELECTED) {
      const randomlyChosenIdsAlreadySelectedByPlayer = randomlySelectElements(
        [...selectedPokemonIds],
        MAX_IDS_OF_POKEMONS_ALREADY_SELECTED
      );

      pokemonIds = [
        selectedPokemonId,
        ...randomlyChosenIdsAlreadySelectedByPlayer,
      ];
    } else pokemonIds = [...selectedPokemonIds, selectedPokemonId];

    let idsCount = pokemonIds.length;
    while (idsCount < TOTAL_IDS) {
      let randomId = getRandomId();
      while (pokemonIds.includes(randomId)) randomId = getRandomId();
      pokemonIds.push(randomId);
      idsCount++;
    }

    return shuffleElements(pokemonIds);
  }

  // handlers
  function handleCardSelection(pokemonId) {
    if (selectedPokemonIds.has(pokemonId)) {
      resetScore();
      alert("This Pokemon has been selected before. New round commencing!");
      setSelectedPokemonIds(new Set());
      setPokemonIds(getRandomPokemonIds());
    } else {
      incrementScore();
      setPokemonIds(regeneratePokemonIds(pokemonId));
      setSelectedPokemonIds(() => new Set(selectedPokemonIds).add(pokemonId));
    }
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
