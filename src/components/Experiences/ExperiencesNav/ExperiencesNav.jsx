import { NavLink } from "react-router-dom";
import { ExperiencesTabs } from "../ExperiencesTabs";
import "./ExperiencesNav.css";

/**
 * ExperiencesNav
 *
 * Renders a tab navigation UI for switching between different experience views.
 *
 * @param {Object} props
 * @param {string} props.experienceTab - The currently selected experience tab.
 * @param {Function} props.setExperienceTab - Function to update the selected experience tab.
 *
 * @returns {JSX.Element} A navigation element with buttons for each experience tab.
 */
export const ExperiencesNav = ({ experienceTab, setExperienceTab }) => {
	return (
		<div className="navigation">
			<NavLink to="/traditional-cv/experiences/frontend-developer" className={`tab`}>
				Frontend Developer
			</NavLink>
			<NavLink to="/traditional-cv/experiences/director" className={`tab`}>
				Director
			</NavLink>
			<NavLink to="/traditional-cv/experiences/supervisor" className={`tab`}>
				Supervisor
			</NavLink>
		</div>
	);
};
