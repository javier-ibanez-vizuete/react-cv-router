import "./GameExplanation.css";

/**
 * GameExplanation component
 *
 * Renders a brief explanation for one of four mini-games depending on the `gameNumber` prop.
 * Includes instructions and a button to start the game.
 *
 * Props:
 * @param {number} gameNumber - Identifies the current game (1: Secret Number, 2: Hangman, 3: Whack-a-Mole, 4: Tic Tac Toe).
 * @param {function} handleStartGame - Callback function triggered when the user clicks the start button.
 * @param {number} lives - Number of lives the user has; used to display gameplay restrictions or loss conditions.
 */
export const GameExplanation = ({ gameNumber, handleStartGame, lives }) => {
	if (gameNumber === 1)
		return (
			<div className="game-explanation-container">
				<h2>NUMERO SECRETO</h2>
				<p>En este Juego debes adivinar el número secreto (Entre 0 y 100) con un maximo de {lives} intentos</p>
				<p>
					Aparecera <span className="error-text">(Mas alto)</span> Si tu numero es inferior
				</p>
				<p>
					Aparecera <span className="error-text">(Mas bajo)</span> si tu numero es superior
				</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);
	if (gameNumber === 2)
		return (
			<div className="game-explanation-container">
				<h2>EL AHORCADO</h2>
				<p>En este Juego deberas adivinar las letras que faltan en la palabra</p>
				<p>Si fallas Pierdes una vida ({`${lives} - 1`})</p>
				<p>Si pierdes todas las vidas Pierdes el Juego</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);
	if (gameNumber === 3)
		return (
			<div className="game-explanation-container">
				<h2>APLASTA AL TOPO</h2>
				<p>En este Juego deberas Hacer 'click' en la casilla donde aparezca el 'Topo'</p>
				<p>Si haces 'Click' en una casilla vacia, Perderas una vida</p>
				<p>Si consigues Golpear a 5 topos. Ganas la partida</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);

	if (gameNumber === 4)
		return (
			<div className="game-explanation-container">
				<h2>TRES EN RAYA</h2>
				<p>En este Juego deberas Ganar a la Maquina</p>
				<p>Colocando 3 cruces en horizontal, vertical o diagonal</p>
				<p>Si pierdes o empatas Perderas una vida</p>
				<p>Si te quedas sin vidas, pierdes el juego</p>
				<button onClick={handleStartGame} className="btn primary-btn">
					Comenzar
				</button>
			</div>
		);
};
