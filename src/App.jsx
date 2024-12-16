import { useState } from "react";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";
import styles from "./app.module.css"

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const incrementScore = () => {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  const resetScore = () => setCurrentScore(0);

  return (
    <div className={styles.appBody}>
      <div className={styles.inner}>
        <Header currentScore={currentScore} highScore={highScore} />
        <main className={styles.mainSection}>
          <Gameboard incrementScore={incrementScore} resetScore={resetScore} />
        </main>
      </div>
    </div>
  );
}

export default App;
