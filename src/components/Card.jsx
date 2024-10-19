import { useEffect, useState } from "react";
import "../styles/card.css";

export default function Card({ id, handleCardSelection }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((results) => results.json())
      .then((data) => {
        setPokemonName(data.name);
        setPokemonImageUrl(data.sprites.front_default);
        setIsLoading(false);
      });
  }, [id]);

  const handleMouseDown = () => handleCardSelection(id);

  return (
    <button className="card" onMouseDown={handleMouseDown} disabled={isLoading}>
      <figure>
        <img src={pokemonImageUrl} alt={`image of ${pokemonName}`} />
      </figure>
      <p>{pokemonName}</p>
    </button>
  );
}
