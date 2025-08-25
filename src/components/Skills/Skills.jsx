import "./Skills.css";

/**
 * Skills component
 *
 * Displays a list of skills as an unordered list. If the `skills` array is empty or undefined,
 * shows a placeholder message indicating skills are being unlocked.
 *
 * Uses:
 * - A span with a friendly “unlocking” message when there are no skills to display.
 * - Maps each skill string to an `<li>` element inside a `<ul>`.
 *
 * @param {object} props
 * @param {string[]} props.skills       Array of skill names (e.g., ["React", "Node.js"])
 * @returns {JSX.Element} A list of skills or an empty-state message
 */
export const Skills = ({ skills }) => {
	if (!skills?.length) return <span className="empty-list-text">Desbloqueando habilidades...</span>;

	return (
		<ul className="skills-list-container">
			{skills.map((skill) => (
				<li key={skill} className="skill-list-item">
					{skill}
				</li>
			))}
		</ul>
	);
};
