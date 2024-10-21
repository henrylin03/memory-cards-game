import "../styles/card.css";

const Card = ({ handleCardSelection, pokemonData }) => (
  <button
    className="card"
    onMouseDown={() => handleCardSelection(pokemonData.id)}
  >
    <figure>
      <img src={pokemonData.imageUrl} alt={`image of ${pokemonData.name}`} />
    </figure>
    <p>{pokemonData.name}</p>
  </button>
);

export default Card;
