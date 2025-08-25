import "./Button.css";

/**
 * Button Component
 *
 * A reusable button component that renders a button element with custom text, class styling,
 * and a click handler function. Provides a default label if none is specified.
 *
 * @component
 * Props:
 * @param {string} className - Additional class names for styling the button.
 * @param {string} bodyText - Text to display inside the button. Defaults to "Click" if not provided.
 * @param {function} handleButton - Function to execute when the button is clicked.
 *
 * @returns {JSX.Element} A styled button element.
 */
export const Button = ({ className, bodyText, handleButton }) => {
	return (
		<button className={className} onClick={handleButton}>
			{bodyText ? bodyText : "Click"}
		</button>
	);
};
