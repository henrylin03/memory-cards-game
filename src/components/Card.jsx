import PropTypes from "prop-types";
import "../styles/card.css";

const Card = ({ handleCardSelection, pokemonData, isLoading }) => {
  return (
    <button
      className="card"
      disabled={isLoading}
      onMouseDown={() => handleCardSelection(pokemonData.id)}
    >
      <figure>
        <img src={pokemonData.imageUrl} alt={`image of ${pokemonData.name}`} />
      </figure>
      <p>{pokemonData.name}</p>
    </button>
  );
};

Card.propTypes = {
  handleCardSelection: PropTypes.func.isRequired,
  pokemonData: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Card;
