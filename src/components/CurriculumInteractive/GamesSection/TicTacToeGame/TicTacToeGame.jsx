import { TURNS_TIC_TAC_TOE } from "../../../../utils/TIC_TAC_TOE_INITIAL_STATS";
import { GameExplanation } from "../GameExplanation/GameExplanation";
import { Square } from "./Square/Square";
import "./TicTacToeGame.css";
import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

/**
 * TicTacToeGame
 *
 * Renders the Tic-Tac-Toe game interface, displaying either an introductory
 * explanation screen or the active game board with turn indicators and win state.
 *
 * @param {Object} props
 * @param {boolean} props.startGame               – Flag indicating if the game has started.
 * @param {number}  props.gameNumber             – Identifier for the current game session.
 * @param {() => void} props.handleStartGame     – Callback to initiate the game.
 * @param {Array<string|null>} props.board        – Array of 9 elements ("X", "O", or null) representing board state.
 * @param {string}  props.turn                   – Current player turn, either `TURNS_TIC_TAC_TOE.X` or `TURNS_TIC_TAC_TOE.O`.
 * @param {(index: number) => void} props.handleTicTacWinner
 *                                                – Callback invoked when a square is clicked.
 * @param {boolean} props.winner                 – Indicates if there is a winning combination.
 *
 * @returns {JSX.Element} The TicTacToeGame component.
 */
export const TicTacToeGame = ({ startGame, gameNumber, handleStartGame, board, turn, handleTicTacWinner, winner }) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} />;
	return (
		<div className="tic-tac-toe-game-container">
			<h2 className="subtitle">TRES EN RAYA</h2>
			<div className="tic-tac-toe-turn-container">
				<Square isSelected={turn === TURNS_TIC_TAC_TOE.X}>{TURNS_TIC_TAC_TOE.X}</Square>
				<Square isSelected={turn === TURNS_TIC_TAC_TOE.O}>{TURNS_TIC_TAC_TOE.O}</Square>
			</div>

			<div className="tic-tac-toe-board-container">
				{board.map((_, index) => {
					return (
						<Square key={index} index={index} handleTicTacWinner={handleTicTacWinner}>
							{board[index]}
						</Square>
					);
				})}
			</div>
			{winner && <FullscreenConfetti />}
			{winner && <span className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</span>}
			{winner && <span className="winner-text">NUEVA SECCION DESBLOQUEADA: CONTACTO</span>}
		</div>
	);
};
