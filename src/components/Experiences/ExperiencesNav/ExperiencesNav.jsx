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
			{Object.entries(ExperiencesTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${experienceTab === value ? "active" : ""}`}
						onClick={() => setExperienceTab(value)}
					>
						{value}
					</button>
				);
			})}
		</div>
	);
};
