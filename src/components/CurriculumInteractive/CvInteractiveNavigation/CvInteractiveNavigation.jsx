import "./CvInteractiveNavigation.css";
import { cvInteractiveTabs } from "./cvInteractiveTabs";

/**
 * CvInteractiveNavigation Component
 *
 * A navigation bar that allows users to switch between different interactive CV sections.
 * Renders a set of buttons based on the entries of the `cvInteractiveTabs` object.
 * Highlights the currently active tab and triggers an update when a tab is clicked.
 *
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - The currently active tab value used to apply styling.
 * @param {function} props.handleInteractiveActiveTabs - Callback function to update the active tab.
 *
 * @example
 * <CvInteractiveNavigation
 *   activeTab={activeTab}
 *   handleInteractiveActiveTabs={setActiveTab}
 * />
 */
export const CvInteractiveNavigation = ({ activeTab, handleInteractiveActiveTabs }) => {
	return (
		<nav className="navigation">
			{Object.entries(cvInteractiveTabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${activeTab === value ? "active" : ""}`}
						onClick={() => handleInteractiveActiveTabs(value)}
					>
						{value}
					</button>
				);
			})}
		</nav>
	);
};
