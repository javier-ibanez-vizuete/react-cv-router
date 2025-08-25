import "./HangmanBody.css";
import { HangmanBodyPiece } from "./HangmanBodyPiece/HangmanBodyPiece";

/**
 * HangmanBody
 *
 * Renders the hangman gallows and body parts progressively based on remaining lives.
 *
 * @param {Object} props
 * @param {number} props.lives – Number of remaining lives (0–10). Each decrement adds one more piece.
 *
 * @returns {JSX.Element} The assembled hangman drawing.
 */
export const HangmanBody = ({ lives }) => {
	return (
		<div className="hangman-body-container">
			{lives <= 10 && <HangmanBodyPiece classStyle={"gallows-beam"} />}
			{lives <= 10 && <HangmanBodyPiece classStyle={"gallows-post"} />}
			{lives <= 9 && <HangmanBodyPiece classStyle={"gallows-post-corner"} />}
			{lives <= 8 && <HangmanBodyPiece classStyle={"crossbeam"} />}
			{lives <= 7 && <HangmanBodyPiece classStyle={"rope"} />}
			{lives <= 6 && <HangmanBodyPiece classStyle={"head"} />}
			{lives <= 5 && <HangmanBodyPiece classStyle={"body-piece"} />}
			{lives <= 4 && <HangmanBodyPiece classStyle={"left-arm"} />}
			{lives <= 3 && <HangmanBodyPiece classStyle={"right-arm"} />}
			{lives <= 2 && <HangmanBodyPiece classStyle={"legs"} />}
			{lives <= 1 && <HangmanBodyPiece classStyle={"left-shoe"} />}
			{lives <= 0 && <HangmanBodyPiece classStyle={"right-shoe"} />}
		</div>
	);
};
