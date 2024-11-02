import PropTypes from "prop-types";
import "../styles/scoreboard.css";

const Scoreboard = ({ currentScore, highScore }) => {
  return (
    <article className="scoreboard">
      <p className="label">score:</p>
      <p className="score">{currentScore}</p>
      <p className="label">high score:</p>
      <p className="highScore">{highScore}</p>
    </article>
  );
};

Scoreboard.propTypes = {
  currentScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Scoreboard;
