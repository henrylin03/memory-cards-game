import { useEffect, useState } from "react";
import Card from "../Card";
import LoadingScreen from "../LoadingScreen";
import {
  getRandomId,
  getRandomPokemonIds,
  shuffleElements,
  randomlySelectElements,
} from "../../helpers";
import fetchPokemonData from "./fetchPokemonData";
import "../../styles/gameboard.css";

export default function Gameboard({ incrementScore, resetScore }) {
  const TOTAL_IDS = 10;
  const [displayedPokemonIds, setDisplayedPokemonIds] = useState(
    getRandomPokemonIds(TOTAL_IDS)
  );
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());
  const [displayedPokemonObjects, setDisplayedPokemonObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemonData = async (ids) => {
      try {
        const promises = ids.map((id) => fetchPokemonData(id));
        const results = await Promise.all(promises);
        setDisplayedPokemonObjects(results);

        for (const pokemonObject of results) {
          await new Promise((resolve) => {
            const img = new Image();
            img.src = pokemonObject.imageUrl;
            img.onload = () => resolve();
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching all Pokemon data:", error);
      }
    };

    fetchAllPokemonData(displayedPokemonIds);
    return () => setIsLoading(true);
  }, [displayedPokemonIds]);

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

  const gameCards = displayedPokemonObjects.map((pokemon) => (
    <Card
      key={pokemon.id}
      handleCardSelection={handleCardSelection}
      pokemonData={pokemon}
    />
  ));

  return (
    <>
      <section className="gameboard">
        {gameCards}
        {isLoading && <LoadingScreen />}
      </section>
    </>
  );
}
