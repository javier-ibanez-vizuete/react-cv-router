import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import "./DevLanguages.css";

/**
 * DevLanguages
 *
 * Renders a list of development languages with progress indicators.
 * If the list is empty, displays a placeholder message.
 *
 * @param {Object} props
 * @param {Array<{ name: string, level: number }>} props.devLanguages
 *        – Array of language objects, each with a `name` and a proficiency `level` (0–100).
 *
 * @returns {JSX.Element} A container of CircularProgressBar components or an empty-state message.
 */
export const DevLanguages = ({ devLanguages }) => {
	if (!devLanguages.length) return <span className="empty-list-text">Desarrollo en curso</span>;

	return (
		<div className="dev-language-container">
			{devLanguages.map((languages) => {
				const { name, level } = languages;

				return <CircularProgressBar name={name} level={level} key={`${name}-${level}`} />;
			})}
		</div>
	);
};
