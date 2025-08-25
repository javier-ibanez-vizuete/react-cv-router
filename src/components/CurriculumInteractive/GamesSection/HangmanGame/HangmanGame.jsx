import { LETTERS } from "../../../../utils/LETTERS";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { HangmanBody } from "./HangmanBody/HangmanBody";
import "./HangmanGame.css";
import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

/**
 * HangmanGame
 *
 * Renders the Hangman game interface, displaying either an introductory explanation
 * screen or the active game view with gallows, word, keyboard, and status messages.
 *
 * @param {Object} props
 * @param {boolean} props.winner             – Whether the player has won the game.
 * @param {number}  props.gameNumber         – Identifier for the current game session.
 * @param {boolean} props.startGame          – Flag indicating if the game has started.
 * @param {() => void} props.handleStartGame – Function to initiate the game.
 * @param {number}  props.lives              – Remaining lives count.
 * @param {string}  props.longWord           – Full word to reveal once the player wins.
 * @param {string}  props.secretWord         – Current masked word display (letters and blanks).
 * @param {(letter: string) => void} props.onCheckingLetter
 *                                            – Callback fired when a letter is selected.
 * @param {string} [props.error]             – Optional error message shown on invalid input.
 *
 * @returns {JSX.Element} The Hangman game component.
 */
export const HangmanGame = ({
	winner,
	gameNumber,
	startGame,
	handleStartGame,
	lives,
	longWord,
	secretWord,
	onCheckingLetter,
	error,
}) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;

	return (
		<div className="hangman-game-container">
			{winner && <FullscreenConfetti />}
			<h2 className="subtitle">EL AHORCADO</h2>
			<HangmanBody lives={lives} />
			{winner && <p className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</p>}
			{winner && <p className="winner-text">NUEVA SECCION DESBLOQUEADA: EXPERIENCIA</p>}
			<div className="hangman-secretword-container">
				{!winner && <span className="secret-word-box">{secretWord.toUpperCase()}</span>}
				{winner && <span className="secret-word-box">{longWord.toUpperCase()}</span>}
			</div>
			<div className="hangman-keyboard-display">
				{LETTERS.map((letter) => {
					return (
						<button key={letter} onClick={() => onCheckingLetter(letter)}>
							{letter}
						</button>
					);
				})}
			</div>
			{error && <span className="error-text">{error}</span>}
		</div>
	);
};
