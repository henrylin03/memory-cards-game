import { useEffect, useState } from "react";
import "../styles/card.css";

export default function Card({ id }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((results) => results.json())
      .then((data) => {
        setPokemonName(data.name);
        setPokemonImageUrl(data.sprites.front_default);
      });
  }, [id]);

  return (
    <button className="card">
      <figure>
        <img src={pokemonImageUrl} alt={`image of ${pokemonName}`} />
      </figure>
      <p>{pokemonName}</p>
    </button>
  );
}
