import { useState } from "react";
import "../styles/gameboard.css";
import Card from "./Card";

const getRandomId = (maxId = 150) => Math.floor(Math.random() * maxId + 1);

export default function Gameboard() {
  const [pokemonIds, setPokemonIds] = useState(getRandomPokemonIds());

  function getRandomPokemonIds() {
    let ids = new Set();

    for (let i = 0; i < 10; i++) {
      let randomId = getRandomId();
      while (ids.has(randomId)) randomId = getRandomId();
      ids.add(randomId);
    }

    return [...ids];
  }

  const gameCards = pokemonIds.map((pokemonId) => (
    <Card key={pokemonId} id={pokemonId} />
  ));

  return <section className="gameboard">{gameCards}</section>;
}
