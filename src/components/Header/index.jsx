import PropTypes from "prop-types";
import styles from "./header.module.css";

const Header = ({ currentScore, highScore }) => (
  <header className={styles.header}>
    <div className={styles.left}>
      <h1 className={styles.heading}>Pokémems</h1>
      <p className={styles.explanation}>
        Earn points by clicking on a Pokemon... but not more than once!
      </p>
    </div>

    <article className={styles.scoreboard} aria-label="Scoreboard">
      <p className={styles.label}>score:</p>
      <p className={styles.score}>{currentScore}</p>
      <p className={styles.label}>high score:</p>
      <p className={styles.score}>{highScore}</p>
    </article>
  </header>
);

Header.propTypes = {
  currentScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Header;
