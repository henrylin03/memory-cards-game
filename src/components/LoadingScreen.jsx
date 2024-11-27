import masterBall from "../assets/masterball.png";
import styles from "../styles/loadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <article className={styles.loadingScreen}>
      <img
        className={styles.masterball}
        src={masterBall}
        alt="spinning master ball"
      />
      <p className={styles.text}>Catching them all...</p>
    </article>
  );
}
