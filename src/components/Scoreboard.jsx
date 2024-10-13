import "../styles/scoreboard.css";

export default function Scoreboard() {
  return (
    <article className="scoreboard">
      <p className="label">score:</p>
      <p className="score">0</p>
      <p className="label">high score:</p>
      <p className="highScore">6</p>
    </article>
  );
}
