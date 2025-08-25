import { useState } from "react";
import "./Experiences.css";
import { ExperiencesTabs } from "./ExperiencesTabs";
import { ExperiencesNav } from "./ExperiencesNav/ExperiencesNav";
import { Experience } from "../Experience/Experience";

/**
 * Experiences
 *
 * Displays the user's professional experience based on the selected experience tab.
 * Also integrates dynamic behavior based on the game result (e.g., secret word revealed or blocked).
 *
 * @param {Object} props
 * @param {JSX.Element} props.children - Optional children elements to render above the experience list.
 * @param {Object} props.cvData - Full CV data, including the `experiences` array.
 * @param {Object} props.gameResult - Optional game result object that may contain a `secretWord` key to control visibility.
 *
 * @returns {JSX.Element} The experiences section with navigation and filtered experience list.
 */
export const Experiences = ({ children, cvData, gameResult }) => {
	const { experiences } = cvData;
	const [experienceTab, setExperienceTab] = useState(ExperiencesTabs.DEVELOP);

	return (
		<section className={`experience-section ${gameResult?.secretWord}`}>
			{gameResult?.secretWord !== "blocked" && children}
			<h2 className="title">Experiencia</h2>
			<ExperiencesNav experienceTab={experienceTab} setExperienceTab={setExperienceTab} />
			<div className="experiences-container">
				{experiences
					.filter(({ position }) => position === experienceTab)
					.map((experience) => {
						return <Experience key={experience.company} experience={experience} />;
					})}
			</div>
		</section>
	);
};
