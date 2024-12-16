import PropTypes from "prop-types";
import styles from "./card.module.css";

const Card = ({ handleCardSelection, pokemonData, isLoading }) => {
  return (
    <button
      className={styles.card}
      disabled={isLoading}
      onMouseDown={() => handleCardSelection(pokemonData.id)}
      aria-label={`Select Pokemon, ${pokemonData.name}`}
    >
      <figure className={styles.imageContainer}>
        <img
          src={pokemonData.imageUrl}
          alt={`image of ${pokemonData.name}`}
          className={styles.image}
        />
      </figure>
      <p className={styles.pokemonName}>{pokemonData.name}</p>
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
