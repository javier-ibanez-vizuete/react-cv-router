import { GameExplanation } from "../GameExplanation/GameExplanation";
import "./MoleSmasherGame.css";

import moleHole from "../../../../assets/pictures/mole/mole-hole/mole-hole.png";
import moleHolePng from "../../../../assets/pictures/mole/mole-hole/mole-hole-200w.png";
import moleHoleWebp from "../../../../assets/pictures/mole/mole-hole/mole-hole-200w.webp";
import moleHoleAvif from "../../../../assets/pictures/mole/mole-hole/mole-hole-200w.avif";

import mole from "../../../../assets/pictures/mole/mole-smiling/mole-smiling.png";
import molePng from "../../../../assets/pictures/mole/mole-smiling/mole-smiling-200w.png";
import moleWebp from "../../../../assets/pictures/mole/mole-smiling/mole-smiling-200w.webp";
import moleAvif from "../../../../assets/pictures/mole/mole-smiling/mole-smiling-200w.avif";

import moleSmashed from "../../../../assets/pictures/mole/mole-smashed/mole-smashed.png";
import moleSmashedPng from "../../../../assets/pictures/mole/mole-smashed/mole-smashed-200w.png";
import moleSmashedWebp from "../../../../assets/pictures/mole/mole-smashed/mole-smashed-200w.png";
import moleSmashedAvif from "../../../../assets/pictures/mole/mole-smashed/mole-smashed-200w.png";

import { FullscreenConfetti } from "../../../FullscreenConfetti/FullscreenConfetti";

/**
 * MoleSmasherGame
 *
 * Renders the “Whack-a-Mole” game interface, showing either a start screen
 * or the active game board with counters, holes, moles, and win state.
 *
 * @param {Object} props
 * @param {boolean} props.startGame             – Flag indicating if the game has started.
 * @param {number}  props.gameNumber            – Identifier for the current game session.
 * @param {() => void} props.handleStartGame    – Callback to initiate the game.
 * @param {number}  props.lives                 – Remaining lives or attempts.
 * @param {number}  props.moles                 – Count of moles smashed so far.
 * @param {Array<Object>} props.moleHoles       – Array of hole objects with shape `{ hasMole: boolean, isSmashed: boolean }`.
 * @param {boolean} props.winner                – Indicates if the player has won the game.
 * @param {(index: number) => void} props.handleMoleClick
 *                                                – Callback fired when a hole is clicked (index of the hole).
 *
 * @returns {JSX.Element} The MoleSmasherGame component.
 */
export const MoleSmasherGame = ({
	startGame,
	gameNumber,
	handleStartGame,
	lives,
	moles,
	moleHoles,
	winner,
	handleMoleClick,
}) => {
	if (!startGame) return <GameExplanation gameNumber={gameNumber} handleStartGame={handleStartGame} lives={lives} />;

	return (
		<div className="mole-smasher-game-container">
			<h2 className="subtitle">APLASTA AL TOPO</h2>

			<div className="mole-smasher-counter-container">
				<div className="mole-smasher-image-container">
					<picture>
						<source srcSet={moleSmashedAvif} type="image/avif" />
						<source srcSet={moleSmashedWebp} type="image/webp" />
						<source srcSet={moleSmashedPng} type="image/png" />
						<img src={moleSmashed} alt="A Smashed Anime Mole" />
					</picture>
				</div>
				<div className="mole-smasher-counter-text-container">
					<h4>Topos Aplastados</h4>
					<p>{moles}</p>
				</div>
			</div>

			{winner && <FullscreenConfetti />}
			{winner && <h3 className="winner-text">ENHORABUENA HAS COMPLETADO EL JUEGO</h3>}
			{winner && <h3 className="winner-text">NUEVA SECCION DESBLOQUEADA: FORMACIÓN</h3>}

			{!winner && (
				<div className="mole-smasher-board">
					{moleHoles.map((hole, index) => {
						return (
							<div key={index} className="hole-box" onClick={() => handleMoleClick(index)}>
								{!hole.hasMole && !hole.isSmashed && (
									<picture>
										<source srcSet={moleHoleAvif} type="image/avif" />
										<source srcSet={moleHoleWebp} type="image/webp" />
										<source srcSet={moleHolePng} type="image/png" />
										<img src={moleHole} alt="A sand hole" />
									</picture>
								)}
								{hole.hasMole && !hole.isSmashed && (
									<picture>
										<source srcSet={moleAvif} type="image/avif" />
										<source srcSet={moleWebp} type="image/webp" />
										<source srcSet={molePng} type="image/png" />
										<img src={mole} alt="A smiling Mole" />
									</picture>
								)}
								{hole.hasMole && hole.isSmashed && (
									<picture>
										<source srcSet={moleSmashedAvif} type="image/avif" />
										<source srcSet={moleSmashedWebp} type="image/webp" />
										<source srcSet={moleSmashedPng} type="image/png" />
										<img src={moleSmashed} alt="A dead Mole" />
									</picture>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
