import { DinamicText } from "../../DinamicText/DinamicText";
import "./InitialModal.css";

const text = `Bienvenido al curriculum interactivo de Javier Ibáñez Vizuete.
                Para desbloquear todo su contenido tendrás que completar 4 sencillos juegos.
                ¿Preparado?`;

/**
 * InitialModal
 *
 * Displays the introductory modal with animated text, guiding the user
 * into the interactive curriculum experience and offering navigation options.
 *
 * @param {Object} props
 * @param {() => void} props.switchToGames       – Callback to start the game sequence.
 * @param {() => void} props.switchToMainScreen  – Callback to return to the main screen.
 *
 * @returns {JSX.Element} The InitialModal component.
 */
export const InitialModal = ({ switchToGames, switchToMainScreen }) => {
	return (
		<div className="initial-modal">
			<DinamicText text={text} speed={60} switchToGames={switchToGames} switchToMainScreen={switchToMainScreen} />
		</div>
	);
};
