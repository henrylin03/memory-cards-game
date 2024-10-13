import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import "./styles/global.css";
import "./styles/header.css";

function App() {
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
        <Scoreboard />
      </header>

      <main>
        <Gameboard />
      </main>
    </>
  );
}

export default App;
