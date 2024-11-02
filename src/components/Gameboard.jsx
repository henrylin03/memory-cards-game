import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import LoadingScreen from "./LoadingScreen";
import useAllPokemon from "../hooks/useAllPokemon";
import {
  getRandomId,
  getRandomPokemonIds,
  shuffleElements,
  randomlySelectElements,
} from "../helpers";
import "../styles/gameboard.css";

const TOTAL_IDS = 10;

const Gameboard = ({ incrementScore, resetScore }) => {
  const [displayedPokemonIds, setDisplayedPokemonIds] = useState(
    getRandomPokemonIds(TOTAL_IDS)
  );
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());
  const { pokemons, error, isLoading } = useAllPokemon(displayedPokemonIds);

  //TODO: handle error
  if (isLoading)
    return (
      <section className="gameboard">
        <LoadingScreen />
      </section>
    );

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
        (id) => newPokemonIds.indexOf(id) === displayedPokemonIds.indexOf(id)
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
      setDisplayedPokemonIds(getRandomPokemonIds(TOTAL_IDS));
    } else {
      incrementScore();
      setDisplayedPokemonIds(regeneratePokemonIds(pokemonId));
      setSelectedPokemonIds(() => new Set(selectedPokemonIds).add(pokemonId));
    }
  };

  return (
    <section className="gameboard">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          handleCardSelection={handleCardSelection}
          pokemonData={pokemon}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};

Gameboard.propTypes = {
  incrementScore: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
};

export default Gameboard;
