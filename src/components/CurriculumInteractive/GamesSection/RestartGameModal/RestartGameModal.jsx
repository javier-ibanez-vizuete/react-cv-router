import "./RestartGameModal.css";
import ReactRain from "react-rain-animation";
import "react-rain-animation/lib/style.css";

/**
 * RestartGameModal
 *
 * Displays a modal prompting the player to restart the game when lives are exhausted.
 *
 * @param {Object} props
 * @param {() => void} props.handleRestartGame – Callback invoked when the player chooses to retry.
 *
 * @returns {JSX.Element} A modal with a rain animation, message, and retry button.
 */
export const RestartGameModal = ({ handleRestartGame }) => {
	return (
		<div className="restart-game-modal">
			<ReactRain numDrops={120} />
			<h2>Te has quedado sin vidas</h2>
			<p>¿Quieres volver a intentarlo?</p>
			<button className="btn secondary-btn" onClick={handleRestartGame}>
				Reintentar
			</button>
		</div>
	);
};
