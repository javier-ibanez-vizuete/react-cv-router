import { NavLink } from "react-router-dom";
import "./Navigation.css";

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
export const Navigation = () => {
	return (
		<nav className="navigation">
			<NavLink to="/traditional-cv/profile" className={`tab`}>
				Perfil
			</NavLink>
			<NavLink to="/traditional-cv/experiences" className={`tab`}>
				Experience
			</NavLink>
			<NavLink to="/traditional-cv/education" className={`tab`}>
				Formacion
			</NavLink>
			<NavLink to="/traditional-cv/contact" className={`tab`}>
				Contact
			</NavLink>
		</nav>
	);
};
