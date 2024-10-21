import { useState } from "react";
import Card from "./Card";
import "../styles/gameboard.css";

const TOTAL_IDS = 10;

const getRandomId = (maxId = 150) => Math.floor(Math.random() * maxId + 1);

// schwartzian transform
const shuffleElements = (array) =>
  array
    .map((element) => ({ element, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ element }) => element);

const randomlySelectElements = (array, numberOfElementsForSelection) =>
  shuffleElements(array).slice(0, numberOfElementsForSelection);

const getRandomPokemonIds = () => {
  let ids = [];
  for (let i = 0; i < TOTAL_IDS; i++) {
    let randomId = getRandomId();
    while (ids.includes(randomId)) randomId = getRandomId();
    ids.push(randomId);
  }

  return [...ids];
};

export default function Gameboard({ incrementScore, resetScore }) {
  const [pokemonIds, setPokemonIds] = useState(getRandomPokemonIds());
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());

  const regeneratePokemonIds = (selectedPokemonId) => {
    const MAX_IDS_OF_POKEMONS_ALREADY_SELECTED = 5;
    let newPokemonIds = [];

    /* SNEAK IN SELECTED POKEMONS */
    // need to add 1 because selectedPokemonIds state has not updated yet here
    if (selectedPokemonIds.size + 1 > MAX_IDS_OF_POKEMONS_ALREADY_SELECTED) {
      const randomlyChosenIdsAlreadySelectedByPlayer = randomlySelectElements(
        [...selectedPokemonIds],
        MAX_IDS_OF_POKEMONS_ALREADY_SELECTED
      );
      newPokemonIds = [
        selectedPokemonId,
        ...randomlyChosenIdsAlreadySelectedByPlayer,
      ];
    } else newPokemonIds = [...selectedPokemonIds, selectedPokemonId];

    /* FILL OUT REST WITH RANDOM POKEMONS */
    let idsCount = newPokemonIds.length;
    while (idsCount < TOTAL_IDS) {
      let randomId = getRandomId();
      while (newPokemonIds.includes(randomId)) randomId = getRandomId();
      newPokemonIds.push(randomId);
      idsCount++;
    }

    /* ENSURE NO POKEMON IS IN THE SAME POSITION AS BEFORE */
    newPokemonIds = shuffleElements(newPokemonIds);
    while (
      newPokemonIds.some(
        (id) => newPokemonIds.indexOf(id) === pokemonIds.indexOf(id)
      )
    )
      newPokemonIds = shuffleElements(newPokemonIds);

    return newPokemonIds;
  };

  // handlers
  const handleCardSelection = (pokemonId) => {
    if (selectedPokemonIds.has(pokemonId)) {
      alert("This Pokemon has been selected before. New round commencing!");

      // reset board
      resetScore();
      setSelectedPokemonIds(new Set());
      setPokemonIds(getRandomPokemonIds());
    } else {
      incrementScore();
      setPokemonIds(regeneratePokemonIds(pokemonId));
      setSelectedPokemonIds(() => new Set(selectedPokemonIds).add(pokemonId));
    }
  };

  const gameCards = pokemonIds.map((pokemonId) => (
    <Card
      key={pokemonId}
      id={pokemonId}
      handleCardSelection={handleCardSelection}
    />
  ));

  return <section className="gameboard">{gameCards}</section>;
}
