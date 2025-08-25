import "./HangmanBodyPiece.css";

/**
 * HangmanBodyPiece
 *
 * Renders a single piece of the hangman gallows or body.
 *
 * @param {Object} props
 * @param {string} props.classStyle – Specific CSS class to apply for this piece.
 *
 * @returns {JSX.Element} A `<div>` element representing one segment of the hangman drawing.
 */
export const HangmanBodyPiece = ({ classStyle }) => {
	return (
		<div className={`hangman-body-piece ${classStyle}`}>
			<div></div>
		</div>
	);
};
