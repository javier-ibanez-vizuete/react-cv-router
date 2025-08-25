import "./Navigation.css";
import { Tabs } from "./Tabs";

/**
 * Navigation component
 *
 * Renders a horizontal set of tab buttons based on the `Tabs` constant.
 * Highlights the currently active tab and notifies parent when a tab is clicked.
 *
 * Uses:
 * - `Tabs` object entries to generate button labels and values
 * - `activeTab` to determine which button is styled as active
 * - `handleActiveTab` callback to update the active tab in parent state
 *
 * @param {object} props
 * @param {string} props.activeTab               Currently selected tab value
 * @param {(tab: string) => void} props.handleActiveTab  Callback invoked with the new tab value when a tab is clicked
 * @returns {JSX.Element} A nav element containing tab buttons
 */
export const Navigation = ({ activeTab, handleActiveTab }) => {
	return (
		<nav className="navigation">
			{Object.entries(Tabs).map(([property, value]) => {
				return (
					<button
						key={property}
						className={`tab ${activeTab === value ? "active" : ""}`}
						onClick={() => handleActiveTab(value)}
					>
						{value}
					</button>
				);
			})}
		</nav>
	);
};
