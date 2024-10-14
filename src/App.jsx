import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import "./styles/global.css";
import "./styles/header.css";

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
    <>
      <header>
        <div className="left">
          <h1>Pokemems</h1>
          <p className="explanation">
            Earn points by clicking on a Pokemon... but don&apos;t click on any
            of them more than once!
          </p>
        </div>
        <Scoreboard currentScore={currentScore} highScore={highScore} />
      </header>

      <main>
        <Gameboard incrementScore={incrementScore} resetScore={resetScore} />
      </main>
    </>
  );
}

export default App;
