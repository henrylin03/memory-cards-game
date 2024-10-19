import "../styles/spinningPokeball.css";
import masterBall from "../assets/masterball.png";

export default function SpinningPokeball() {
  return (
    <figure className="pokeballWrapper">
      <img className="pokeball" src={masterBall} alt="spinning master ball" />
    </figure>
  );
}
