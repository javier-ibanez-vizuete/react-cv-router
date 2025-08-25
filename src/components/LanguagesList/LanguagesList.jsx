import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import "./LanguagesList.css";

/**
 * LanguagesList component
 *
 * Displays a list of language proficiency indicators using `CircularProgressBar`.
 * If the `languages` array is empty, shows a placeholder message.
 *
 * Uses:
 * - A span with a friendly “learning” message when there are no languages.
 * - Maps each language object to a `CircularProgressBar`, passing `name` and `level`.
 *
 * @param {object} props
 * @param {{ name: string; level: number }} props.languages[]  Array of language objects
 * @param {string} props.languages[].name                    Language name (e.g., "JavaScript")
 * @param {number} props.languages[].level                   Proficiency level (0–100)
 * @returns {JSX.Element} A list of circular progress bars or an empty-state message
 */
export const LanguagesList = ({ languages }) => {
	if (!languages.length) return <span className="empty-list-text">Aprendiendo a Caminar...</span>;

	return (
		<ul className="languages-list-container">
			{languages.map((language) => {
				const { name, level } = language;

				return <CircularProgressBar key={`${name}-${level}`} name={name} level={level} />;
			})}
		</ul>
	);
};
