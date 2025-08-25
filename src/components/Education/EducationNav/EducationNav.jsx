import { EducationTabs } from "../EducationTabs";
import "./EducationNav.css";

/**
 * EducationNav
 *
 * Renders a tab navigation component for the education section, allowing the user
 * to switch between different education views.
 *
 * @param {Object} props
 * @param {string} props.educationTab - Currently active education tab.
 * @param {Function} props.setEducationTab - Function to update the active tab.
 *
 * @returns {JSX.Element} A list of buttons representing the education navigation tabs.
 */
export const EducationNav = ({ educationTab, setEducationTab }) => {
	return (
		<div className="navigation">
			{Object.entries(EducationTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${educationTab === value ? "active" : ""}`}
						onClick={() => setEducationTab(value)}
					>
						{value}
					</button>
				);
			})}
		</div>
	);
};
