import { Button } from "../Button/Button";
import "./NightMode.css";

/**
 * NightMode component
 *
 * A toggle switch for switching between light and dark (night) modes.
 * Wraps a `Button` component that displays an icon based on the current mode.
 *
 * Uses:
 * - `nightMode` to apply an “active” class when dark mode is enabled
 * - `bodyText` to determine the button’s displayed content (e.g., 🌞 or 🌑)
 * - `className` to pass through custom styling classes to the button
 * - `onToggleNightMode` as the click handler to change the mode
 *
 * @param {object} props
 * @param {boolean} props.nightMode              Whether dark (night) mode is currently active
 * @param {string}  props.bodyText               Text or icon to display inside the toggle button
 * @param {string}  [props.className]            Optional CSS class(es) applied to the button
 * @param {() => void} props.onToggleNightMode   Callback to toggle between light and dark modes
 * @returns {JSX.Element} A night mode toggle wrapped in a div
 */
export const NightMode = ({ nightMode, bodyText, className, onToggleNightMode }) => {
	return (
		<div className={`night-mode ${nightMode ? "active" : ""}`}>
			<Button bodyText={bodyText} handleButton={onToggleNightMode} className={className} />
		</div>
	);
};
