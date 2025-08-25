import { useEffect, useState } from "react";
import "./DinamicText.css";

/**
 * DinamicText
 *
 * Displays a text with a typewriter effect, showing characters one by one at a given speed.
 * Once the full text is displayed, shows two buttons to navigate.
 *
 * @param {Object} props
 * @param {string} props.text - The full text to display dynamically.
 * @param {number} props.speed - The delay in milliseconds between each character.
 * @param {function} props.switchToGames - Callback to switch to the games view.
 * @param {function} props.switchToMainScreen - Callback to switch to the main screen.
 *
 * @returns {JSX.Element} The dynamic text paragraph and navigation buttons when complete.
 */
export const DinamicText = ({ text, speed, switchToGames, switchToMainScreen }) => {
	const [currentText, setCurrentText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prev) => prev + text.charAt(index));
				setIndex(index + 1);
			}, speed);

			return () => clearTimeout(timeout);
		}
	}, [index]);

	return (
		<>
			<p>{currentText}</p>
			{index === text.length && (
				<button className="btn primary-btn" onClick={switchToGames}>
					Aceptar
				</button>
			)}
			{index === text.length && (
				<button className="btn secondary-btn" onClick={switchToMainScreen}>
					volver
				</button>
			)}
		</>
	);
};
