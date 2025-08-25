import "./GamesSection.css";
import { HangmanGame } from "./HangmanGame/HangmanGame";
import { MoleSmasherGame } from "./MoleSmasherGame/MoleSmasherGame";
import { RestartGameModal } from "./RestartGameModal/RestartGameModal";
import { SecretNumberGame } from "./SecretNumberGame/SecretNumberGame";
import { TicTacToeGame } from "./TicTacToeGame/TicTacToeGame";
import { CongratsScreen } from "../../CongratsScreen/CongratsScreen";

/**
 * GamesSection
 *
 * Manages the flow and rendering of multiple mini-games based on the current game state.
 * Displays a restart modal if lives are exhausted, otherwise shows the header and
 * the appropriate game component or the final congratulations screen.
 *
 * @param {Object} props
 * @param {boolean} props.winner – Whether the current game has been won.
 * @param {number}  props.gameNumber – Index of the current game (1–4).
 * @param {boolean} props.startGame – Flag indicating if the current game has started.
 * @param {number}  props.lives – Remaining lives count.
 * @param {() => void} props.handleGameNumber – Advances to the next game.
 * @param {() => void} props.handleStartGame - Starts the current game.
 * @param {() => void} props.handleRestartGame – Restarts the entire game sequence when lives reach zero.
 * @param {() => void} props.decreaseLive – Decrements the lives count.
 * @param {number}  props.secretNumber – Secret number for SecretNumberGame.
 * @param {string}  props.error – Error or hint message for number guessing.
 * @param {(msg: string) => void} props.setError – Setter for the error/hint message.
 * @param {string}  props.longWord – Full word revealed in HangmanGame once won.
 * @param {string}  props.secretWord – Current masked word in HangmanGame.
 * @param {(letter: string) => void} props.onCheckingLetter – Letter-check callback for HangmanGame.
 * @param {number}  props.moles – Count of moles smashed in MoleSmasherGame.
 * @param {Array<Object>} props.moleHoles – Array of hole objects for MoleSmasherGame.
 * @param {(index: number) => void} props.handleMoleClick – Hole-click callback for MoleSmasherGame.
 * @param {Array<string|null>} props.board – Board state for TicTacToeGame.
 * @param {string}  props.turn – Current player turn for TicTacToeGame.
 * @param {(index: number) => void} props.handleTicTacWinner – Square-click callback for TicTacToeGame.
 *
 * @returns {JSX.Element} The section containing either the restart modal, headers,
 *                        a specific game component, or the final congrats screen.
 */
export const GamesSection = ({
	winner,
	gameNumber,
	startGame,
	lives,
	handleGameNumber,
	handleStartGame,
	handleRestartGame,
	decreaseLive,
	secretNumber,
	error,
	setError,
	longWord,
	secretWord,
	onCheckingLetter,
	moles,
	moleHoles,
	handleMoleClick,
	board,
	turn,
	handleTicTacWinner,
}) => {
	if (lives === 0) return <RestartGameModal handleRestartGame={handleRestartGame} />;

	return (
		<section className="games-section">
			{gameNumber !== 5 && <span className="game-number-display">{`Juego ${gameNumber}/4`}</span>}
			{gameNumber !== 5 && <span className="game-number-display">{`Vidas ${lives}/10`}</span>}
			{gameNumber === 1 && (
				<SecretNumberGame
					gameNumber={gameNumber}
					startGame={startGame}
					lives={lives}
					handleGameNumber={handleGameNumber}
					handleStartGame={handleStartGame}
					decreaseLive={decreaseLive}
					secretNumber={secretNumber}
					error={error}
					setError={setError}
				/>
			)}
			{gameNumber === 2 && (
				<HangmanGame
					winner={winner}
					gameNumber={gameNumber}
					startGame={startGame}
					handleStartGame={handleStartGame}
					lives={lives}
					longWord={longWord}
					secretWord={secretWord}
					onCheckingLetter={onCheckingLetter}
					error={error}
				/>
			)}
			{gameNumber === 3 && (
				<MoleSmasherGame
					startGame={startGame}
					gameNumber={gameNumber}
					handleStartGame={handleStartGame}
					lives={lives}
					moles={moles}
					moleHoles={moleHoles}
					winner={winner}
					handleMoleClick={handleMoleClick}
				/>
			)}
			{gameNumber === 4 && (
				<TicTacToeGame
					startGame={startGame}
					gameNumber={gameNumber}
					handleStartGame={handleStartGame}
					board={board}
					turn={turn}
					handleTicTacWinner={handleTicTacWinner}
					winner={winner}
				/>
			)}
			{gameNumber > 4 && <CongratsScreen />}
		</section>
	);
};
