import masterBall from "../../assets/masterball.png";
import styles from "./loadingScreen.module.css";

const LoadingScreen = () => (
  <article
    className={styles.loadingScreen}
    role="status"
    aria-busy="true"
    aria-label="Loading Pokémon data"
  >
    <img
      className={styles.masterball}
      src={masterBall}
      alt="Loading animation"
    />
    <p className={styles.text}>Catching them all...</p>
  </article>
);

export default LoadingScreen;
