import "./CvSelector.css";
import { AppTabs } from "./AppTabs.js";
import { NightMode } from "../NightMode/NightMode.jsx";

/**
 * CvSelector
 *
 * Renders a modal allowing the user to choose between the traditional or interactive
 * curriculum view, with a toggle for dark/light mode.
 *
 * @param {Object} props
 * @param {(view: string) => void} props.handleCurriculumView
 *        – Callback invoked with the selected view identifier when a button is clicked.
 * @param {boolean} props.nightMode
 *        – Flag indicating whether dark mode is currently active.
 * @param {() => void} props.onToggleNightMode
 *        – Callback to toggle between dark and light themes.
 *
 * @returns {JSX.Element} The CvSelector component.
 */
export const CvSelector = ({ handleCurriculumView, nightMode, onToggleNightMode }) => {
	return (
		<section className="cv-selector-modal">
			<NightMode
				bodyText={nightMode ? "🌞" : "🌑"}
				className={"night-mode-btn"}
				onToggleNightMode={onToggleNightMode}
			/>
			<h1 className="title">Bienvenido al Curriculum de Javier Ibáñez Vizuete</h1>
			<p className="subtitle">¿Que Curriculum quiere visualizar?</p>
			<div className="cv-selector-btns-container">
				{Object.entries(AppTabs).map(([property, value]) => {
					return (
						<button
							key={property}
							className={`cv-selector-btn ${
								value === AppTabs.CV_TRADICIONAL ? "tradicional" : "interactive"
							}`}
							onClick={() => handleCurriculumView(value)}
						>
							{value}
						</button>
					);
				})}
			</div>
		</section>
	);
};
