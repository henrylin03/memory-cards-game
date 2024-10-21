const fetchPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    return { id, name: data.name, imageUrl: data.sprites.front_default };
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};

export default fetchPokemonData;
