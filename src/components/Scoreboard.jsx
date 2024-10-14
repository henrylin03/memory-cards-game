import "../styles/scoreboard.css";

export default function Scoreboard({ currentScore, highScore }) {
  return (
    <article className="scoreboard">
      <p className="label">score:</p>
      <p className="score">{currentScore}</p>
      <p className="label">high score:</p>
      <p className="highScore">{highScore}</p>
    </article>
  );
}
