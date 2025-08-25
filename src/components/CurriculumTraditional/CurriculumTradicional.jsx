import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./CurriculumTraditional.css";
import { Tabs } from "../Navigation/Tabs";
import { Profile } from "../Profile/Profile";
import { Experiences } from "../Experiences/Experiences";
import { Education } from "../Education/Education";
import { ContactSection } from "../ContactSection/ContactSection";
import { Footer } from "../Footer/Footer";
import { getDataFromStorage, saveDataInStorage } from "../../helpers/localStorage/localStorage";

/**
 * CurriculumTradicional
 *
 * Renders the traditional CV view with tabbed navigation for profile, experience,
 * education, and contact sections. Persists the active tab in localStorage and
 * allows switching back to the interactive CV or directly to contact.
 *
 * @param {Object}   props
 * @param {Array<Object>}  props.cvData               – Data object containing CV details.
 * @param {Object}   props.form                        – Form state for contact submissions.
 * @param {string}   props.error                       – Current error message for the contact form.
 * @param {() => void} props.onFormSubmit              – Handler invoked on contact form submission.
 * @param {(id: string) => void} props.onDeleteForm    – Handler for deleting a contact entry.
 * @param {(event: Event) => void} props.onInputChange – Handler for contact form input changes.
 * @param {() => void} props.switchToMainScreen        – Callback to switch back to the main interactive view.
 * @param {boolean}  props.nightMode                   – Flag indicating if dark mode is active.
 * @param {() => void} props.onToggleNightMode         – Callback to toggle dark/light theme.
 *
 * @returns {JSX.Element} The CurriculumTradicional component.
 */
export const CurriculumTradicional = ({
	cvData,
	form,
	error,
	onFormSubmit,
	onDeleteForm,
	onInputChange,
	switchToMainScreen,
	nightMode,
	onToggleNightMode,
}) => {
	const [activeTab, setActiveTab] = useState(() => {
		const activeTabFromStorage = getDataFromStorage("active_tab");
		if (activeTabFromStorage) return activeTabFromStorage;
		return Tabs.PROFILE;
	});

	const handleActiveTab = (value) => {
		saveDataInStorage("active_tab", value);
		setActiveTab(value);
	};

	const switchToContact = () => {
		saveDataInStorage("active_tab", Tabs.CONTACT);
		setActiveTab(Tabs.CONTACT);
	};

	return (
		<div className="curriculum-tradicional-container">
			<header>
				<Navigation activeTab={activeTab} handleActiveTab={handleActiveTab} />
				<h2 className="title">Javier Ibáñez Vizuete</h2>
			</header>
			<main>
				{activeTab === Tabs.PROFILE && <Profile cvData={cvData} />}
				{activeTab === Tabs.EXPERIENCE && <Experiences cvData={cvData} />}
				{activeTab === Tabs.EDUCATION && <Education cvData={cvData} />}
				{activeTab === Tabs.CONTACT && (
					<ContactSection
						cvData={cvData}
						form={form}
						error={error}
						onFormSubmit={onFormSubmit}
						onInputChange={onInputChange}
						onDeleteForm={onDeleteForm}
					/>
				)}
			</main>
			<Footer
				switchToMainScreen={switchToMainScreen}
				activeTab={activeTab}
				switchToContact={switchToContact}
				nightMode={nightMode}
				onToggleNightMode={onToggleNightMode}
			/>
		</div>
	);
};
