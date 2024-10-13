import "../styles/gameboard.css";

function Card() {
  return (
    <button className="card">
      <figure>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="image of Ditto"
        />
      </figure>
      <p>Ditto</p>
    </button>
  );
}

export default function Gameboard() {
  return (
    <section className="gameboard">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </section>
  );
}
