import "./FloatingText.css";

/**
 * FloatingText
 *
 * Displays a floating status text based on the game result.
 * It shows either "COMPLETADO" if the game was passed, or "RENDIDO" otherwise.
 *
 * @param {Object} props
 * @param {string} props.gameResult - Game outcome. Expected values: "passed", "failed", or undefined.
 *
 * @returns {JSX.Element} A floating heading with a dynamic class and message.
 */
export const FloatingText = ({ gameResult }) => {
	const text = gameResult === "passed" ? "COMPLETADO" : "RENDIDO";

	const className = `floating-text result-${gameResult ? gameResult : ""}`;

	return <h2 className={className}>{text}</h2>;
};
