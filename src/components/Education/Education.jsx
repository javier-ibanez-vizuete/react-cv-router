import { useState } from "react";
import "./Education.css";
import { EducationTabs } from "./EducationTabs";
import { EducationNav } from "./EducationNav/EducationNav";
import { EducationList } from "../EducationList/EducationList";
import { Skills } from "../Skills/Skills";
import { DevLanguages } from "../DevLanguages/DevLenguages";
import { LanguagesList } from "../LanguagesList/LanguagesList";

/**
 * Education
 *
 * Displays the Education section of the CV, with multiple tabbed views such as:
 * - Education history
 * - Skills
 * - Development languages
 * - Spoken languages
 *
 * It also renders children conditionally based on the game result.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children - Optional children content (e.g., a game or animation).
 * @param {Object} props.cvData - Contains all CV data: education, skills, devLanguages, languages.
 * @param {Object} [props.gameResult] - Result object to optionally block rendering (e.g., from a mini-game).
 *
 * @returns {JSX.Element} The full Education section with navigable tabs.
 */
export const Education = ({ children, cvData, gameResult }) => {
	const [educationTab, setEducationTab] = useState(EducationTabs.EDUCATION);

	const { skills, devLanguages, languages } = cvData;

	return (
		<section className={`education-section ${gameResult?.moleSmasher}`}>
			{gameResult?.moleSmasher !== "blocked" && children}
			<h2 className="title">Formación</h2>
			<EducationNav educationTab={educationTab} setEducationTab={setEducationTab} />
			{educationTab === EducationTabs.EDUCATION && <EducationList cvData={cvData} />}
			{educationTab === EducationTabs.SKILLS && <Skills skills={skills} />}
			{educationTab === EducationTabs.DEV_LENGUAGES && <DevLanguages devLanguages={devLanguages} />}
			{educationTab === EducationTabs.LANGUAGES && <LanguagesList languages={languages} />}
		</section>
	);
};
