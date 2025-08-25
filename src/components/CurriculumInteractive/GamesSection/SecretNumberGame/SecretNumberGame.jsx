import { useState } from "react";
import "./SecretNumberGame.css";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

/**
 * SecretNumberGame
 *
 * Renders the “Secret Number” game interface, handling user input, validation,
 * and game progression including win/loss states.
 *
 * @param {Object} props
 * @param {number}  props.gameNumber        – Identifier for the current game session.
 * @param {boolean} props.startGame         – Flag indicating if the game has started.
 * @param {number}  props.lives             – Remaining lives count.
 * @param {() => void} props.handleGameNumber – Callback to advance to the next game.
 * @param {() => void} props.handleStartGame  – Callback to initiate the game.
 * @param {() => void} props.decreaseLive     – Callback to decrement the life count.
 * @param {number}  props.secretNumber      – The randomly selected number to guess.
 * @param {string}  props.error             – Current error or hint message.
 * @param {(msg: string) => void} props.setError – Setter for the error/hint message.
 *
 * @returns {JSX.Element} The SecretNumberGame component.
 */
export const SecretNumberGame = ({
	gameNumber,
	startGame,
	lives,
	handleGameNumber,
	handleStartGame,
	decreaseLive,
	secretNumber,
	error,
	setError,
}) => {
	const [inputNumber, setInputNumber] = useState("");
	const [isWinner, setIsWinner] = useState(false);

	/**
	 * handleInputChange
	 *
	 * Handles changes to the input field for entering a number.
	 * - Clears the input and state if the input is empty.
	 * - Otherwise, resets any error and updates the input number state with the numeric value.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 * @returns {void}
	 */
	const handleInputChange = (event) => {
		if (!event.target.value) {
			setInputNumber("");
			return;
		}

		setError("");
		setInputNumber(Number(event.target.value));
	};

	/**
	 * checkWinner
	 *
	 * Handles the form submission to check if the user's input matches the secret number.
	 *
	 * Workflow:
	 * 1. Prevents default form submission behavior.
	 * 2. Validates that an input number has been entered; if not, sets an error.
	 * 3. Compares the input number to the secret number:
	 *    - If input is less than secret number, prompts "Higher", decreases a life, and resets input.
	 *    - If input is greater than secret number, prompts "Lower", decreases a life, and resets input.
	 *    - If input matches the secret number, toggles the winner state, resets input,
	 *      and after 6 seconds advances to the next game.
	 *
	 * @param {React.FormEvent} event - The form submission event.
	 * @returns {void}
	 */
	const checkWinner = (event) => {
		event.preventDefault();
		if (!inputNumber && inputNumber !== 0) return setError("Debes introducir un numero");

		if (inputNumber < secretNumber) {
			setError("Mas Alto");
			decreaseLive();
			setInputNumber("");
			return;
		}

		if (inputNumber > secretNumber) {
			setError("Mas bajo");
			decreaseLive();
			setInputNumber("");
			return;
		}

		if (inputNumber === secretNumber) {
			setIsWinner((prev) => !prev);
			setInputNumber("");
			setTimeout(() => {
				handleGameNumber();
			}, 6000);
		}
	};

	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;

	return (
		<div className="secret-number-game-container">
			<h2 className="subtitle">Numero Secreto</h2>
			{isWinner && <h2 className="secret-number-box">{secretNumber}</h2>}
			{isWinner && <FullscreenConfetti />}
			{isWinner && <p className="winner-text">ENHORABUENA PASAS AL SIGUIENTE JUEGO</p>}
			{isWinner && <p className="winner-text">NUEVA SECCION DESBLOQUEADA: PERFIL</p>}
			{!isWinner && <h2 className="secret-number-box">?</h2>}
			<form action="#" onSubmit={checkWinner} className="secret-number-form">
				<input
					type="number"
					value={inputNumber}
					onChange={handleInputChange}
					placeholder="Introduce un numero del 1 al 100"
				/>
				<button type="submit" className="btn primary-btn">
					Comprobar
				</button>
			</form>
			{error && <span className="error-text error-secret-number">{error}</span>}
		</div>
	);
};
