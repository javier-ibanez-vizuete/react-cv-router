import { TURNS_TIC_TAC_TOE } from "../../../../../utils/TIC_TAC_TOE_INITIAL_STATS";
import "./Square.css";

/**
 * Square
 *
 * Renders a single square in the Tic-Tac-Toe board, applying visual states
 * for selection and occupancy, and handles user interaction.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children               – Content of the square (e.g., "X", "O", or null).
 * @param {number}         props.index                  – Index of the square within the board (0–8).
 * @param {(index: number) => void} props.handleTicTacWinner
 *                                                        – Callback invoked when the square is clicked.
 * @param {boolean}        props.isSelected             – Whether this square is part of the winning combination.
 *
 * @returns {JSX.Element} The rendered square element.
 */
export const Square = ({ children, index, handleTicTacWinner, isSelected }) => {
	const className = `square-tic-tac ${isSelected ? "is-selected" : ""} ${children !== null ? "full-square" : ""}`;

	return (
		<div onClick={() => handleTicTacWinner(index)} className={className}>
			<span>{children}</span>
		</div>
	);
};
