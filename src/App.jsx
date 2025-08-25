import { use, useState } from "react";
import "./App.css";
import { CvSelector } from "./components/CvSelector/CvSelector";
import { AppTabs } from "./components/CvSelector/AppTabs";
import { CurriculumTradicional } from "./components/CurriculumTraditional/CurriculumTradicional";
import { CurriculumInteractive } from "./components/CurriculumInteractive/CurriculumInteractive";
import { CV_DATA } from "./utils/CV_DATA";
import { GridBackground } from "./components/GridBackground/GridBackground";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "./helpers/localStorage/localStorage";

const INITIAL_FORM_STATE = {
	contactName: "",
	companyName: "",
	contactReason: "",
	contactDescription: "",
};

/**
 * App
 *
 * Main application component.
 * Manages:
 *   • Dark mode toggle (persisted in localStorage)
 *   • CV view selection (traditional, interactive, or selector; persisted)
 *   • Contact form state, validation, and mailto workflow (persisted)
 *
 * State:
 *   • nightMode: boolean
 *   • cvView: 'traditional' | 'interactive' | null
 *   • cvData: object (static CV dataset)
 *   • form: { contactName, companyName, contactReason, contactDescription }
 *   • error: string
 *
 * Methods:
 *   onToggleNightMode()
 *     @returns {void}
 *     Toggle & persist dark mode.
 *
 *   handleCurriculumView(v)
 *     @param {'traditional'|'interactive'|null} v - Target CV view
 *     @returns {void}
 *     Switch view and clear form & errors.
 *
 *   onInputChange(e)
 *     @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>} e
 *     @returns {void}
 *     Update one form field and clear errors.
 *
 *   onFormSubmit()
 *     @returns {void}
 *     Validate form, trigger mailto link, and reset form.
 *
 *   onDeleteForm()
 *     @returns {void}
 *     Clear form data and errors.
 *
 *   switchToMainScreen()
 *     @returns {void}
 *     Reset to selector and clear cvView.
 *
 * @returns {JSX.Element}
 */
export const App = () => {
	const [nightMode, setNightMode] = useState(() => {
		const nightModeFromStorage = getDataFromStorage("night_mode");
		if (nightModeFromStorage) return nightModeFromStorage;
		return false;
	});
	const [cvView, setCvView] = useState(() => {
		const curriculumViewFromStorage = getDataFromStorage("cv_view");
		if (curriculumViewFromStorage) return curriculumViewFromStorage;
		return null;
	});
	const [cvData, setCvData] = useState(CV_DATA); // Utilizo un estado por si quiero agregar funciones para meter datos como correos electronicos de contactantes
	const [form, setForm] = useState(() => {
		const formDataFromStorage = getDataFromStorage("form_data");
		if (formDataFromStorage) return formDataFromStorage;
		return INITIAL_FORM_STATE;
	}); // INITIAL_FORM_STATE
	const [error, setError] = useState(() => {
		const errorTextFromStorage = getDataFromStorage("error_text");
		if (errorTextFromStorage) return errorTextFromStorage;
		return "";
	});

	/**
	 * onToggleNightMode
	 *
	 * Toggles the night mode state between enabled and disabled.
	 * Updates both the component state and persists the new value in localStorage.
	 *
	 * @returns {void}
	 */
	const onToggleNightMode = () => {
		setNightMode((prev) => {
			saveDataInStorage("night_mode", !prev);
			return !prev;
		});
	};

	/**
	 * handleCurriculumView
	 *
	 * Clears any existing form data and error messages, then updates
	 * the current CV view and persists it to localStorage.
	 *
	 * @param {'traditional' | 'interactive' | null} value
	 *   The target curriculum view to display:
	 *   - `'traditional'` (AppTabs.CV_TRADICIONAL)
	 *   - `'interactive'` (AppTabs.CV_INTERACTIVE)
	 *   - `null` to return to the selector screen.
	 * @returns {void}
	 */
	const handleCurriculumView = (value) => {
		removeFromStorage("form_data");
		setForm(INITIAL_FORM_STATE);

		removeFromStorage("error_text");
		setError("");

		setCvView(value);
		saveDataInStorage("cv_view", value);
	};

	/**
	 * onInputChange
	 *
	 * Handles changes to any contact form field:
	 * 1. Clears existing error messages.
	 * 2. Updates the specific form field in state.
	 * 3. Persists the updated form data to localStorage.
	 *
	 * @param {React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >} event The change event from the form control, containing:
	 *   - `event.target.name`: the form field key
	 *   - `event.target.value`: the new field value
	 * @returns {void}
	 */
	const onInputChange = (event) => {
		removeFromStorage("error_text");
		setError("");

		const { name, value } = event.target;
		setForm((prev) => {
			saveDataInStorage("form_data", { ...prev, [name]: value });
			return { ...prev, [name]: value };
		});
	};

	/**
	 * onFormSubmit
	 *
	 * Validate contact form fields and, if valid, open the user’s email client
	 * with a pre-filled `mailto:` link.
	 * Clears stored form data and resets to initial state after sending.
	 *
	 * Validation order:
	 * 1. `contactName`
	 * 2. `companyName`
	 * 3. `contactReason`
	 * 4. `contactDescription`
	 *
	 * If any field is empty, sets and persists an appropriate error message.
	 *
	 * @returns {void}
	 */
	const onFormSubmit = () => {
		const { contactName, companyName, contactReason, contactDescription } = form;
		if (!contactName)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo 'Nombre'");
				return "Rellene el campo 'Nombre'";
			});
		if (!companyName)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo 'Nombre de la empresa'");
				return "Rellene el campo 'Nombre de la empresa'";
			});
		if (!contactReason)
			return setError(() => {
				saveDataInStorage("error_text", "Debe seleccionar una 'Razon de contacto'");
				return "Debe seleccionar una 'Razon de contacto'";
			});
		if (!contactDescription)
			return setError(() => {
				saveDataInStorage("error_text", "Rellene el campo Descripcion adicional");
				return "Rellene el campo Descripcion adicional";
			});

		const email = (cvData.personalInfo.email || "").trim();
		const subject = `${contactName} from ${companyName} - [${contactReason}]`;
		const body = contactDescription.replace(/\n/g, "\r\n");

		const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		const temporalAnchor = document.createElement("a");
		temporalAnchor.style.display = "none";
		temporalAnchor.href = mailToLink;
		document.body.appendChild(temporalAnchor);
		temporalAnchor.click();
		document.body.removeChild(temporalAnchor);

		removeFromStorage("form_data");
		setForm(INITIAL_FORM_STATE);
	};

	/**
	 * onDeleteForm
	 *
	 * Clears any validation errors and resets the contact form
	 * to its initial state, both in memory and in localStorage.
	 *
	 * @returns {void}
	 */
	const onDeleteForm = () => {
		removeFromStorage("error_text");
		setError("");

		removeFromStorage("form_data");
		setForm(INITIAL_FORM_STATE);
	};

	/**
	 * switchToMainScreen
	 *
	 * Resets the application to the main selector screen by clearing
	 * the persisted CV view and setting it to `null`.
	 *
	 * @returns {void}
	 */
	const switchToMainScreen = () => {
		removeFromStorage("cv_view");
		setCvView(null);
	};

	return (
		<div className={`app-container container ${nightMode ? "night-mode-active" : ""}`}>
			<GridBackground />
			{!cvView && (
				<CvSelector
					handleCurriculumView={handleCurriculumView}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
			{cvView === AppTabs.CV_TRADICIONAL && (
				<CurriculumTradicional
					cvData={cvData}
					form={form}
					error={error}
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					onDeleteForm={onDeleteForm}
					switchToMainScreen={switchToMainScreen}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
			{cvView === AppTabs.CV_INTERACTIVE && (
				<CurriculumInteractive
					switchToMainScreen={switchToMainScreen}
					cvView={cvView}
					cvData={cvData}
					form={form}
					error={error}
					setError={setError}
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					onDeleteForm={onDeleteForm}
					nightMode={nightMode}
					onToggleNightMode={onToggleNightMode}
				/>
			)}
		</div>
	);
};
