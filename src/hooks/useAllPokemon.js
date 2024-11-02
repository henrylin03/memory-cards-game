import { useState, useEffect } from "react";

const useAllPokemon = (pokemonIds) => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        mode: "cors",
      });

      if (response.status >= 400)
        throw new Error(
          `An error occurred while fetching Pokemon with id ${id} from PokeAPI`
        );

      const data = await response.json();

      const imageUrl = data.sprites.front_default;
      await new Promise((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = resolve;
      });

      return { id, name: data.name, imageUrl };
    } catch (error) {
      setError(
        error.message ||
          `An error occurred while fetching Pokemon with id ${id} from PokeAPI`
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchAllData = async () => {
      try {
        const promises = pokemonIds.map((id) => fetchData(id));
        const results = await Promise.all(promises);
        setPokemons(results);
      } catch (error) {
        setError(
          error.message ||
            "An error occurred while fetching Pokemon data from PokeAPI"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [pokemonIds]);

  return { pokemons, error, isLoading };
};

export default useAllPokemon;
