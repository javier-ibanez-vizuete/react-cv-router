import { useState, useEffect } from "react";
import "./CurriculumInteractive.css";
import { CvInteractiveNavigation } from "./CvInteractiveNavigation/CvInteractiveNavigation.jsx";
import { InitialModal } from "./InitialModal/InitialModal.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { cvInteractiveTabs } from "./CvInteractiveNavigation/cvInteractiveTabs.js";
import { GamesSection } from "./GamesSection/GamesSection.jsx";
import { WORDS_DATA } from "../../utils/WORDS_DATA.js";
import { INITIAL_MOLE_STATES } from "../../utils/INITIAL_MOLE_STATES.js";
import { INITIAL_BOARD, TURNS_TIC_TAC_TOE, WINNER_COMBOS } from "../../utils/TIC_TAC_TOE_INITIAL_STATS.js";
import { CurriculumComplete } from "../CurriculumComplete/CurriculumComplete.jsx";
import { Button } from "../Button/Button.jsx";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/localStorage/localStorage.js";

/**
 * Generates a random integer between 0 and 100 (inclusive).
 *
 * Uses:
 * - `Math.random()` to generate a float in [0, 1)
 * - Multiplies by 100 and rounds with `Math.round()` to produce an integer
 *
 * @returns {number} A random integer from 0 to 100
 */
const getRandomNumber = () => {
	const randomNumber = Math.round(Math.random() * 100);
	return randomNumber;
};

/**
 * Selects a random word from the WORDS_DATA array.
 *
 * Uses:
 * - `WORDS_DATA.length` to determine the number of available words.
 * - `Math.random()` to generate a random index within the array bounds.
 * - `Math.round()` to ensure the index is an integer.
 *
 * @returns {string} A randomly chosen word from WORDS_DATA.
 */
const getRandomWord = () => {
	const maxlength = WORDS_DATA.length;
	const randomNumber = Math.round(Math.random() * (maxlength + 1));
	const word = WORDS_DATA[randomNumber];
	return word;
};

/**
 * Creates a “secret” version of a word by replacing all inner letters
 * (except the first and last) with underscores.
 *
 * Uses:
 * - `oldWord` or the first element of `WORDS_DATA` as the source word
 * - Converts word to lowercase for consistent comparison
 * - Splits into characters and maps each one:
 *   - Keeps the first and last letters
 *   - Replaces all other letters with `_`
 * - Joins the characters back into a string
 *
 * @param {string} [oldWord=WORDS_DATA[0]]  The original word to transform; defaults to the first word in WORDS_DATA
 * @returns {string} The transformed word with inner letters hidden (e.g., "h_llo" for "hello")
 */
const createSecretWord = (oldWord = WORDS_DATA[0]) => {
	const lastIndex = oldWord.length - 1;
	const firstLetter = oldWord[0].toLowerCase();
	const lastLetter = oldWord[lastIndex].toLowerCase();
	const minusWord = oldWord.toLowerCase();

	const secretWord = minusWord
		.split("")
		.map((letter) => {
			if (!letter.includes(firstLetter) && !letter.includes(lastLetter)) {
				return "_";
			}
			return letter;
		})
		.join("");
	return secretWord;
};

/**
 * Generates a random integer index between 0 (inclusive) and the provided array length (exclusive).
 *
 * Uses:
 * - `Math.random()` to produce a float in the range [0, 1)
 * - Multiplies by `arrayLength` and applies `Math.floor()` to get a valid array index
 *
 * @param {number} arrayLength  The length of the array (must be a positive integer)
 * @returns {number} A random index from 0 up to (but not including) arrayLength
 */
const getRandomIndex = (arrayLength) => {
	const randomIndex = Math.floor(Math.random() * arrayLength);
	return randomIndex;
};

const INITIAL_GAME_RESULT_STATES = {
	secretNumber: "blocked",
	secretWord: "blocked",
	moleSmasher: "blocked",
	ticTacToe: "blocked",
};

/**
 * CurriculumInteractive
 *
 * Orchestrates the interactive CV experience, managing tab navigation, game state,
 * persistence (via localStorage), and rendering either the initial modal, a series
 * of mini-games, or the completed CV form based on user progress.
 *
 * @param {Object} props
 * @param {boolean} props.cvView                     – Flag indicating if the CV main view is active.
 * @param {() => void} props.switchToMainScreen      – Callback to switch back to the non-interactive CV view.
 * @param {Array<Object>} props.cvData               – Data for rendering the completed CV details.
 * @param {Object} props.form                        – Form state object for CV contributions.
 * @param {string} props.error                       – Current error message (e.g., form or game errors).
 * @param {(msg: string) => void} props.setError     – Setter for updating the error message.
 * @param {(event: Event) => void} props.onFormSubmit– Handler for submitting CV form data.
 * @param {(event: Event) => void} props.onInputChange– Handler for form input changes.
 * @param {(id: string) => void} props.onDeleteForm  – Handler for deleting an entry from the form.
 * @param {boolean} props.nightMode                  – Whether dark mode is enabled.
 * @param {() => void} props.onToggleNightMode       – Callback to toggle dark/light theme.
 *
 * @returns {JSX.Element}
 */
export const CurriculumInteractive = ({
	cvView,
	switchToMainScreen,
	cvData,
	form,
	error,
	setError,
	onFormSubmit,
	onInputChange,
	onDeleteForm,
	nightMode,
	onToggleNightMode,
}) => {
	const [activeTab, setActiveTab] = useState(() => {
		const activeTabInteractiveFromStorage = getDataFromStorage("active_tab_interactive");
		if (activeTabInteractiveFromStorage) return activeTabInteractiveFromStorage;
		return null;
	});
	const [gameNumber, setGameNumber] = useState(() => {
		const gameNumberFromStorage = getDataFromStorage("game_number");
		if (gameNumberFromStorage) return Number(gameNumberFromStorage);
		return 1;
	});
	const [lives, setLives] = useState(() => {
		const livesFromStorage = getDataFromStorage("lives");
		return livesFromStorage ?? 10;
	});

	const [startGame, setStartGame] = useState(() => {
		const startGameFromStorage = getDataFromStorage("is_game_started");
		if (startGameFromStorage) return startGameFromStorage;
		return false;
	});
	const [winner, setWinner] = useState(() => {
		const winnerFromStorage = getDataFromStorage("winner");
		if (winnerFromStorage) return winnerFromStorage;
		return false;
	});

	const [gameResult, setGameResult] = useState(() => {
		const gameResultFromStorage = getDataFromStorage("game_result");
		return gameResultFromStorage ?? INITIAL_GAME_RESULT_STATES;
	});

	// Primer juego
	const [secretNumber, setSecretNumber] = useState(() => {
		const secretNumberFromStorage = getDataFromStorage("secret_number");
		return secretNumberFromStorage ?? getRandomNumber();
	});

	// Segundo juego
	const [longWord, setLongWord] = useState(() => {
		const longWordFromStorage = getDataFromStorage("long_word");
		if (longWordFromStorage) return longWordFromStorage;
		return getRandomWord();
	});
	const [secretWord, setSecretWord] = useState(() => {
		const secretWordFromStorage = getDataFromStorage("secret_word");
		if (secretWordFromStorage) return secretWordFromStorage;
		return createSecretWord(longWord);
	});

	// Tercer juego
	const [moleHoles, setMoleHoles] = useState(() => {
		const moleHolesFromStorage = getDataFromStorage("mole_holes");
		return moleHolesFromStorage ?? INITIAL_MOLE_STATES;
	});
	const [moles, setMoles] = useState(() => {
		const molesFromStorage = getDataFromStorage("moles");
		return molesFromStorage ?? 0;
	});

	// Cuarto juego
	const [board, setBoard] = useState(() => {
		const boardFromStorage = getDataFromStorage("board");
		return boardFromStorage ?? INITIAL_BOARD;
	});
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = getDataFromStorage("turn");
		if (turnFromStorage) return turnFromStorage;
		return TURNS_TIC_TAC_TOE.X;
	});

	/**
	 * switchToGames
	 *
	 * Switches the active interactive CV tab to “Games” and persists this choice to local storage.
	 *
	 * Uses:
	 * - `saveDataInStorage(key, value)` to save the selected tab under `"active_tab_interactive"`.
	 * - `setActiveTab(value)` to update the React state to `cvInteractiveTabs.GAMES`.
	 *
	 * @returns {void}
	 */
	const switchToGames = () => {
		saveDataInStorage("active_tab_interactive", cvInteractiveTabs.GAMES);
		setActiveTab(cvInteractiveTabs.GAMES);
	};

	/**
	 * handleInteractiveActiveTabs
	 *
	 * Updates the interactive CV’s active tab state and persists the selection.
	 *
	 * Uses:
	 * - `setActiveTab(value)` to update React state for the current tab.
	 * - `saveDataInStorage("active_tab_interactive", value)` to save the selection in localStorage.
	 *
	 * @param {string} value  The tab identifier to activate (e.g., cvInteractiveTabs.GAMES)
	 * @returns {void}
	 */
	const handleInteractiveActiveTabs = (value) => {
		setActiveTab(value);
		saveDataInStorage("active_tab_interactive", value);
	};

	/**
	 * handleGameNumber
	 *
	 * Advances the game flow based on the current `gameNumber` and updates state and localStorage accordingly:
	 * 1. Marks the result of the completed mini-game as "passed" (if not surrendered) in `gameResult`.
	 * 2. If the player is a winner, schedules another check after 5 seconds.
	 * 3. Increments `gameNumber` to move to the next mini-game.
	 * 4. Resets game-specific state and storage: lives, game start flag, winner flag.
	 * 5. Returns to the interactive CV tab (`cvInteractiveTabs.CV_INTERACTIVE`).
	 *
	 * Uses:
	 * - `setGameResult(prev => ...)` to update the result of the current mini-game
	 * - `saveDataInStorage("game_result", updatedResult)` to persist game results
	 * - `setTimeout(() => handleGameNumber(), 5000)` if the user has won, to delay advancing
	 * - `setGameNumber(prev => prev + 1)` and `saveDataInStorage("game_number", newNumber)` to increment the game index
	 * - `setLives(10)` and `saveDataInStorage("lives", 10)` to reset lives
	 * - `setStartGame(false)` and `saveDataInStorage("is_game_started", false)` to stop the current game
	 * - `setWinner(false)` and `saveDataInStorage("winner", false)` to clear the winner flag
	 * - `setActiveTab(cvInteractiveTabs.CV_INTERACTIVE)` and `saveDataInStorage("active_tab_interactive", cvInteractiveTabs.CV_INTERACTIVE)` to navigate back to the interactive CV view
	 *
	 * Relies on these external values:
	 * - `gameNumber`: numeric index (1–4) identifying which mini-game just finished
	 * - `prevGameResult`: object with keys `secretNumber`, `secretWord`, `moleSmasher`, `ticTacToe`
	 * - `winner`: boolean indicating if the last round was won
	 *
	 * @returns {void}
	 */
	const handleGameNumber = () => {
		setGameResult((prevGameResult) => {
			const { secretNumber, secretWord, moleSmasher, ticTacToe } = prevGameResult;
			if (gameNumber === 1 && secretNumber !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, secretNumber: "passed" });
				return { ...prevGameResult, secretNumber: "passed" };
			}

			if (gameNumber === 2 && secretWord !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, secretWord: "passed" });
				return { ...prevGameResult, secretWord: "passed" };
			}
			if (gameNumber === 3 && moleSmasher !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, moleSmasher: "passed" });
				return { ...prevGameResult, moleSmasher: "passed" };
			}
			if (gameNumber === 4 && ticTacToe !== "surrendered") {
				saveDataInStorage("game_result", { ...prevGameResult, ticTacToe: "passed" });
				return { ...prevGameResult, ticTacToe: "passed" };
			}
			return prevGameResult;
		});

		if (winner)
			return setTimeout(() => {
				handleGameNumber();
			}, 5000);

		setGameNumber((prev) => {
			saveDataInStorage("game_number", prev + 1);
			return prev + 1;
		});

		saveDataInStorage("lives", 10);
		setLives(10);

		saveDataInStorage("is_game_started", false);
		setStartGame(false);

		saveDataInStorage("winner", false);
		setWinner(false);

		saveDataInStorage("active_tab_interactive", cvInteractiveTabs.CV_INTERACTIVE);
		setActiveTab(cvInteractiveTabs.CV_INTERACTIVE);
	};

	/**
	 * handleStartGame
	 *
	 * Toggles the game start state from `false` to `true` and persists this change.
	 * Does nothing if the game is already started.
	 *
	 * Uses:
	 * - Checks `startGame` to ensure it only toggles when starting (not stopping).
	 * - `setStartGame(prev => !prev)` to update the React state.
	 * - `saveDataInStorage("is_game_started", newValue)` to persist the start flag.
	 *
	 * @returns {void}
	 */
	const handleStartGame = () => {
		if (!startGame)
			return setStartGame((prev) => {
				saveDataInStorage("is_game_started", !prev);
				return !prev;
			});
	};

	/**
	 * decreaseLive
	 *
	 * Decrements the player's lives by one and persists the new value.
	 * If lives reach zero after decrement, clears any existing error text.
	 *
	 * Uses:
	 * - `setLives(prev => prev - 1)` to update state
	 * - `saveDataInStorage("lives", newLives)` to persist the updated lives count
	 * - Checks if `lives` is zero (before decrement completes) to clear error text:
	 *   - Calls `setError("")` to reset the error state
	 *   - Uses `removeFromStorage("error_text")` to remove persisted error messages
	 *
	 * @returns {void}
	 */
	const decreaseLive = () => {
		setLives((prev) => {
			saveDataInStorage("lives", prev - 1);
			return prev - 1;
		});
		if (lives === 0)
			return setError(() => {
				removeFromStorage("error_text");
				return "";
			});
	};

	/**
	 * handleRestartGame
	 *
	 * Resets the entire game state and clears all related data from localStorage.
	 * This function is typically called when the player wants to restart the game from scratch.
	 *
	 * Actions performed:
	 * - Resets game number to 1 and removes "game_number" from storage
	 * - Resets lives to 10 and removes "lives" from storage
	 * - Generates a new secret number and updates state and storage
	 * - Resets start flag and removes "is_game_started" from storage
	 * - Generates a new random word and updates state and storage
	 * - Resets mole-related states and clears corresponding storage keys
	 *
	 * @returns {void}
	 */
	const handleRestartGame = () => {
		removeFromStorage("game_number");
		setGameNumber(1);

		removeFromStorage("lives");
		setLives(10);

		setSecretNumber(() => {
			removeFromStorage("secret_number");
			return getRandomNumber();
		});

		removeFromStorage("is_game_started");
		setStartGame(false);

		let secretWord;
		setLongWord(() => {
			const randomWord = getRandomWord();
			saveDataInStorage("long_word", randomWord);
			secretWord = createSecretWord(randomWord);
			return randomWord;
		});

		setSecretWord(() => {
			saveDataInStorage("secret_word", secretWord);
			return secretWord;
		});

		removeFromStorage("mole_holes");
		setMoleHoles(INITIAL_MOLE_STATES);

		removeFromStorage("moles");
		setMoles(0);

		saveDataInStorage("game_result", INITIAL_GAME_RESULT_STATES);
		setGameResult(INITIAL_GAME_RESULT_STATES);

		switchToGames();
	};

	/**
	 * onCheckingLetter
	 *
	 * Handles a letter guess in a word-guessing mini-game. It updates the secret word if the guess is correct,
	 * deducts a life if incorrect, and triggers a win condition if the word is completed.
	 *
	 * Workflow:
	 * 1. Clears any previous error message and resets localStorage entry `"error_text"`.
	 * 2. Ignores further input if the game has already been won (`winner === true`).
	 * 3. Checks if the letter has already been guessed and shown in the secret word:
	 *    - If yes, sets a specific error message and exits.
	 * 4. If the guessed letter does not exist in the original word:
	 *    - Sets an error message.
	 *    - Decreases the player's lives by 1 and updates storage.
	 * 5. If the letter is correct and new:
	 *    - Fills in the letter in the `secretWord` based on its position in `longWord`.
	 *    - Updates both the state and localStorage with the new `secretWord`.
	 * 6. If all letters have been revealed (no underscores remain):
	 *    - Sets `winner` to true and stores it.
	 *    - Schedules a call to `handleGameNumber` after a 6-second delay.
	 *
	 * @param {string} letter - The guessed letter (case-insensitive).
	 * @returns {void}
	 */
	const onCheckingLetter = (letter) => {
		removeFromStorage("error_text");
		setError("");
		const buttonLetter = letter.toLowerCase();
		if (winner) return;

		if (longWord.includes(buttonLetter) && secretWord.includes(buttonLetter))
			return setError(() => {
				saveDataInStorage("error_text", `LA LETRA (${letter.toUpperCase()}) YA EXISTE.`);
				return `LA LETRA (${letter.toUpperCase()}) YA EXISTE.`;
			});

		if (!longWord.includes(buttonLetter)) {
			setError(() => {
				saveDataInStorage("error_text", `LA PALABRA NO CONTIENE LA LETRA (${letter})`);
				return `LA PALABRA NO CONTIENE LA LETRA (${letter})`;
			});
			return setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
		}

		const newSecretWordArray = secretWord.split("");

		longWord.split("").forEach((character, index) => {
			if (character === buttonLetter) return (newSecretWordArray[index] = buttonLetter);
		});

		const newSecretWord = newSecretWordArray.join("");
		saveDataInStorage("secret_word", newSecretWord);
		setSecretWord(newSecretWord);

		if (!newSecretWord.includes("_")) {
			setTimeout(() => {
				handleGameNumber();
			}, 6000);
			return setWinner((prev) => {
				saveDataInStorage("winner", !prev);
				return !prev;
			});
		}
	};

	/**
	 * handleMoleClick
	 *
	 * Handles user interaction in the "Whack-a-Mole" mini-game when a mole hole is clicked.
	 * Updates game state and localStorage based on whether a mole was present.
	 *
	 * Behavior:
	 * 1. If the clicked hole does **not** have a mole and fewer than 5 moles have been hit:
	 *    - Decreases the player's lives by 1 and updates storage.
	 * 2. If a mole **is** present:
	 *    - Increments the mole count and updates storage.
	 *    - Marks the clicked hole as "smashed" in both state and storage.
	 *
	 * Uses:
	 * - `moleHoles[index].hasMole` to check if the clicked hole contains a mole
	 * - `moles < 5` to allow penalizing only while the target has not been reached
	 * - `setLives`, `setMoles`, and `setMoleHoles` to update state
	 * - `saveDataInStorage` to persist changes to localStorage
	 *
	 * @param {number} index - The index of the clicked mole hole
	 * @returns {void}
	 */
	const handleMoleClick = (index) => {
		if (!moleHoles[index].hasMole && moles < 5) {
			setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
			return;
		}

		setMoles((prev) => {
			saveDataInStorage("moles", prev + 1);
			return prev + 1;
		});

		setMoleHoles((prev) => {
			saveDataInStorage(
				"mole_holes",
				prev.map((hole, indexHole) => (index === indexHole ? { ...hole, isSmashed: true } : hole))
			);
			return prev.map((hole, indexHole) => (index === indexHole ? { ...hole, isSmashed: true } : hole));
		});
		return;
	};

	/**
	 * Effect to check the mole hit count and trigger the win condition.
	 *
	 * This `useEffect` runs every time the `moles` state changes.
	 * When the player has hit 5 or more moles (`moles >= 5`), it:
	 * - Toggles the `winner` state and saves it to localStorage.
	 * - Sets a 6-second timeout to call `handleGameNumber` to advance the game.
	 * - Clears the timeout after execution to avoid memory leaks.
	 *
	 * Dependencies:
	 * - `moles`: triggers the effect whenever this value changes.
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		if (moles < 5) return;
		setWinner((prev) => {
			saveDataInStorage("winner", !prev);
			return !prev;
		});
		const timeOut = setTimeout(() => {
			handleGameNumber();
			return clearTimeout(timeOut);
		}, 6000);
	}, [moles]);

	/**
	 * Effect to manage the "Whack-a-Mole" mole appearance cycle.
	 *
	 * This `useEffect` runs once on component mount to start a recurring interval every 700ms.
	 * On each interval tick:
	 * - Checks if any mole hole currently has a mole.
	 *   - If yes, resets all holes to the initial state (no moles).
	 *   - If no, randomly assigns a mole to one hole.
	 * The effect ensures the mole “pops up” and disappears periodically.
	 *
	 * Cleanup:
	 * - Clears the interval on component unmount to avoid memory leaks.
	 *
	 * Dependencies:
	 * - None, runs once on mount.
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		const interval = setInterval(() => {
			setMoleHoles((prev) => {
				const hasMole = prev.some((hole) => hole.hasMole);

				if (hasMole) {
					return INITIAL_MOLE_STATES.map((hole) => ({ ...hole }));
				}
				if (!hasMole) {
					const randomIndex = getRandomIndex(prev.length);
					return prev.map((hole, index) => ({ ...hole, hasMole: index === randomIndex }));
				}
			});
		}, 700);
		return () => clearInterval(interval);
	}, []);

	/**
	 * checkTicTacWinner
	 *
	 * Checks the Tic-Tac-Toe board for a winning combination.
	 *
	 * Iterates over all possible winning combinations defined in `WINNER_COMBOS`.
	 * For each combo, it verifies if the same non-empty symbol (e.g., "X" or "O")
	 * occupies all three positions in the combo.
	 *
	 * Returns:
	 * - The winning symbol ("X" or "O") if a winning combo is found.
	 * - `null` if no winner is detected.
	 *
	 * @param {Array<string|null>} boardToCheck - Current state of the Tic-Tac-Toe board, array of 9 elements representing squares
	 * @returns {string|null} The winning symbol or null if no winner
	 */
	const checkTicTacWinner = (boardToCheck) => {
		for (const combo of WINNER_COMBOS) {
			const [squareA, squareB, squareC] = combo;
			if (
				boardToCheck[squareA] &&
				boardToCheck[squareA] === boardToCheck[squareB] &&
				boardToCheck[squareA] === boardToCheck[squareC]
			) {
				return boardToCheck[squareA];
			}
		}
		return null;
	};

	/**
	 * handleTicTacWinner
	 *
	 * Handles a player's move in the Tic-Tac-Toe game and updates the game state accordingly.
	 *
	 * Workflow:
	 * 1. Prevents moves if it's O's turn or the game already has a winner.
	 * 2. Updates the board at the selected index with the current player's turn.
	 * 3. Saves the updated board state to localStorage.
	 * 4. Switches the turn to the other player (X ↔ O) and persists it.
	 * 5. Checks if the move resulted in a winner using `checkTicTacWinner`:
	 *    - If there is a winner, toggles the winner state and saves it.
	 *    - Sets a 6-second timeout to advance the game and switch to the interactive CV tab.
	 * 6. Checks if the board is full (a draw):
	 *    - Decreases lives by one and persists it.
	 *    - Resets the turn to X and clears related stored data.
	 *    - Resets the board state.
	 *
	 * @param {number} index - The board index (0-8) where the player places their mark.
	 * @returns {void}
	 */
	const handleTicTacWinner = (index) => {
		if (turn === TURNS_TIC_TAC_TOE.O) return;
		if (board[index] || winner) return;

		const newboard = [...board];
		newboard[index] = turn;
		setBoard(newboard);
		saveDataInStorage("board", newboard);

		const newTurn = turn === TURNS_TIC_TAC_TOE.X ? TURNS_TIC_TAC_TOE.O : TURNS_TIC_TAC_TOE.X;
		setTurn(newTurn);
		saveDataInStorage("turn", newTurn);

		const newWinner = checkTicTacWinner(newboard);

		if (newWinner) {
			setWinner((prev) => {
				saveDataInStorage("winner", !prev);
				return !prev;
			});
			setTimeout(() => {
				handleGameNumber();
				saveDataInStorage("active_tab_interactive", cvInteractiveTabs.CV_INTERACTIVE);
				setActiveTab(cvInteractiveTabs.CV_INTERACTIVE);
			}, 6000);
		}
		const BoardFull = newboard.every((square) => square !== null);

		if (BoardFull) {
			setLives((prev) => {
				saveDataInStorage("lives", prev - 1);
				return prev - 1;
			});
			setTurn(TURNS_TIC_TAC_TOE.X);
			removeFromStorage("turn");

			removeFromStorage("board");
			setBoard(INITIAL_BOARD);
			return;
		}
	};

	/**
	 * Effect to handle the Tic-Tac-Toe AI (O player) move.
	 *
	 * This `useEffect` triggers whenever `turn`, `board`, or `winner` changes.
	 * It runs only if it's O's turn and there is no winner yet.
	 *
	 * Workflow:
	 * 1. Finds all empty positions on the board.
	 * 2. If no empty positions remain, does nothing.
	 * 3. Selects a random empty position.
	 * 4. After a 1-second delay:
	 *    - Places an O in the chosen position.
	 *    - Updates board state and persists it.
	 *    - Checks for a winner:
	 *       - If O wins, resets the board, removes stored board, sets turn to X, and decreases lives.
	 *    - If no winner, switches turn back to X and saves it.
	 *
	 * Cleanup:
	 * - Clears the timeout on dependency change or component unmount.
	 *
	 * Dependencies:
	 * - `turn`, `board`, and `winner`
	 *
	 * @returns {void}
	 */
	useEffect(() => {
		if (turn !== TURNS_TIC_TAC_TOE.O || winner) return;

		const emptyPosition = board
			.map((holes, index) => (holes === null ? index : null))
			.filter((value) => value !== null);

		if (emptyPosition.length === 0) return;

		const randomIndex = Math.floor(Math.random() * emptyPosition.length);
		const randomEmptyPosition = emptyPosition[randomIndex];

		const timeOut = setTimeout(() => {
			const newBoard = [...board];
			newBoard[randomEmptyPosition] = TURNS_TIC_TAC_TOE.O;
			setBoard(newBoard);
			saveDataInStorage("board", newBoard);

			const newWinner = checkTicTacWinner(newBoard);
			if (newWinner) {
				setBoard(INITIAL_BOARD);
				removeFromStorage("board");

				setTurn(TURNS_TIC_TAC_TOE.X);
				saveDataInStorage("turn", TURNS_TIC_TAC_TOE.X);
				setLives((prev) => {
					saveDataInStorage("lives", prev - 1);
					return prev - 1;
				});
				return;
			}
			setTurn(TURNS_TIC_TAC_TOE.X);
			saveDataInStorage("turn", TURNS_TIC_TAC_TOE.X);
		}, 1000);

		return () => clearTimeout(timeOut);
	}, [turn, board, winner]);

	/**
	 * handleSurrenderButton
	 *
	 * Handles the player's surrender action for the current mini-game.
	 * Depending on the active game number, it updates the corresponding game result
	 * status to "surrendered" both in state and localStorage.
	 *
	 * After updating the surrender status, it triggers advancing to the next game.
	 *
	 * Games handled:
	 * - 1: secretNumber
	 * - 2: secretWord
	 * - 3: moleSmasher
	 * - 4: ticTacToe
	 *
	 * @returns {void}
	 */
	const handleSurrenderButton = () => {
		if (gameNumber === 1)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, secretNumber: "surrendered" });
				return { ...prev, secretNumber: "surrendered" };
			});
		if (gameNumber === 2)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, secretWord: "surrendered" });
				return { ...prev, secretWord: "surrendered" };
			});
		if (gameNumber === 3)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, moleSmasher: "surrendered" });
				return { ...prev, moleSmasher: "surrendered" };
			});
		if (gameNumber === 4)
			setGameResult((prev) => {
				saveDataInStorage("game_result", { ...prev, ticTacToe: "surrendered" });
				return { ...prev, ticTacToe: "surrendered" };
			});
		handleGameNumber();
		return;
	};

	if (!activeTab) return <InitialModal switchToGames={switchToGames} switchToMainScreen={switchToMainScreen} />;
	return (
		<div className="curriculum-interactive-container">
			<header>
				<CvInteractiveNavigation
					activeTab={activeTab}
					handleInteractiveActiveTabs={handleInteractiveActiveTabs}
				/>
			</header>
			<main id="main">
				{activeTab === cvInteractiveTabs.GAMES && (
					<GamesSection
						winner={winner}
						gameNumber={gameNumber}
						startGame={startGame}
						lives={lives}
						handleGameNumber={handleGameNumber}
						handleStartGame={handleStartGame}
						handleRestartGame={handleRestartGame}
						decreaseLive={decreaseLive}
						secretNumber={secretNumber}
						error={error}
						setError={setError}
						longWord={longWord}
						secretWord={secretWord}
						onCheckingLetter={onCheckingLetter}
						moles={moles}
						moleHoles={moleHoles}
						handleMoleClick={handleMoleClick}
						board={board}
						turn={turn}
						handleTicTacWinner={handleTicTacWinner}
					/>
				)}
				{activeTab === cvInteractiveTabs.CV_INTERACTIVE && (
					<CurriculumComplete
						cvData={cvData}
						form={form}
						error={error}
						onFormSubmit={onFormSubmit}
						onInputChange={onInputChange}
						onDeleteForm={onDeleteForm}
						gameResult={gameResult}
					/>
				)}
			</main>
			<Footer
				cvView={cvView}
				switchToMainScreen={switchToMainScreen}
				nightMode={nightMode}
				onToggleNightMode={onToggleNightMode}
			>
				{activeTab === cvInteractiveTabs.GAMES && gameNumber < 5 && (
					<Button className={"btn primary-btn"} bodyText={"Rendirse"} handleButton={handleSurrenderButton} />
				)}
				<Button className={"btn primary-btn"} bodyText={"Reiniciar Juegos"} handleButton={handleRestartGame} />
			</Footer>
		</div>
	);
};
