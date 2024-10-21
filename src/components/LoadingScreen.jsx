import masterBall from "../assets/masterball.png";
import "../styles/loadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <img className="masterball" src={masterBall} alt="spinning master ball" />
      <p>Catching them all...</p>
    </div>
  );
}
