import { AppTabs } from "../CvSelector/AppTabs";
import { Tabs } from "../Navigation/Tabs";
import { NightMode } from "../NightMode/NightMode";
import "./Footer.css";

/**
 * Footer component
 *
 * A reusable footer section providing:
 * - A “Change Curriculum” button to return to the main CV screen
 * - An optional “Contact” button when not already on the contact tab or in interactive CV view
 * - A NightMode toggle (shows “🌞” in night mode, “🌑” otherwise)
 * - Any additional custom content via `children`
 *
 * @param {object}   props
 * @param {ReactNode} props.children              Optional additional content rendered inside the footer
 * @param {string}   props.cvView                 Current CV view state (used to hide “Contact” button in interactive mode)
 * @param {() => void} props.switchToMainScreen   Callback to switch back to the main CV screen
 * @param {string}   props.activeTab              Currently active navigation tab
 * @param {(tab: string) => void} props.switchToContact Callback to switch to the contact tab
 * @param {boolean}  props.nightMode              Whether the app is currently in night mode
 * @param {() => void} props.onToggleNightMode    Callback to toggle night mode on/off
 */
export const Footer = ({
	children,
	cvView,
	switchToMainScreen,
	activeTab,
	switchToContact,
	nightMode,
	onToggleNightMode,
}) => {
	return (
		<footer>
			<button className="btn secondary-btn" onClick={switchToMainScreen}>
				Cambiar Curriculum
			</button>
			{activeTab !== Tabs.CONTACT && cvView !== AppTabs.CV_INTERACTIVE && (
				<button onClick={() => switchToContact(Tabs.CONTACT)} className="btn primary-btn">
					Contacto
				</button>
			)}
			{children}
			<NightMode
				nightMode={nightMode}
				bodyText={nightMode ? "🌞" : "🌑"}
				onToggleNightMode={onToggleNightMode}
				className={"night-mode-btn"}
			/>
		</footer>
	);
};
