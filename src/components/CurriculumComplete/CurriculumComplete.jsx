import { ContactSection } from "../ContactSection/ContactSection";
import { DivisorLine } from "../DivisorLine/DivisorLine";
import { Education } from "../Education/Education";
import { EncriptedContent } from "../EncriptedContent/EncriptedContent";
import { Experiences } from "../Experiences/Experiences";
import { FloatingText } from "../FloatingText/FloatingText";
import { Profile } from "../Profile/Profile";
import "./CurriculumComplete.css";

/**
 * CurriculumComplete Component
 *
 * This component acts as the main layout for displaying a full interactive CV.
 * It conditionally renders different sections (Profile, Experience, Education, Contact)
 * based on the result of associated mini-games (stored in `gameResult`).
 * If a section is locked ("blocked"), it shows an encrypted placeholder instead.
 *
 * Props:
 * @param {Object} cvData - Contains the CV content such as profile, experiences, and education.
 * @param {Object} form - Object representing the contact form fields.
 * @param {string} error - Error message related to the contact form.
 * @param {Function} onFormSubmit - Callback function to handle form submission.
 * @param {Function} onInputChange - Callback function to handle input change.
 * @param {Function} onDeleteForm - Callback function to reset the form.
 * @param {Object} gameResult - Object with the results of mini-games to conditionally unlock sections.
 *
 * @returns {JSX.Element} The CurriculumComplete section with dynamic content.
 */
export const CurriculumComplete = ({ cvData, form, error, onFormSubmit, onInputChange, onDeleteForm, gameResult }) => {
	return (
		<section className="curriculum-complete-section">
			<h2 className="title">Javier Ibáñez Vizuete</h2>

			{gameResult.secretNumber === "blocked" && <EncriptedContent bodyText={"Perfil"} />}
			<Profile cvData={cvData} gameResult={gameResult}>
				<FloatingText gameResult={gameResult?.secretNumber} />
			</Profile>

			{gameResult.secretWord !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.secretWord === "blocked" && <EncriptedContent bodyText={"Experiencia"} />}
			<Experiences cvData={cvData} gameResult={gameResult}>
				<FloatingText gameResult={gameResult?.secretWord} />
			</Experiences>

			{gameResult.moleSmasher !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.moleSmasher === "blocked" && <EncriptedContent bodyText={"Formación"} />}
			<Education cvData={cvData} gameResult={gameResult}>
				<FloatingText gameResult={gameResult?.moleSmasher} />
			</Education>

			{gameResult.ticTacToe !== "blocked" && <DivisorLine horizontalLine thickness={2} />}

			{gameResult.ticTacToe === "blocked" && <EncriptedContent bodyText={"Contacto"} />}
			<ContactSection
				cvData={cvData}
				form={form}
				error={error}
				onFormSubmit={onFormSubmit}
				onInputChange={onInputChange}
				onDeleteForm={onDeleteForm}
				gameResult={gameResult}
			>
				<FloatingText gameResult={gameResult?.ticTacToe} />
			</ContactSection>
		</section>
	);
};
