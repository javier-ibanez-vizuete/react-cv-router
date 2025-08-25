import "./CircularProgressBar.css";

/**
 * CircularProgressBar Component
 *
 * This component displays a circular progress bar representing language proficiency levels.
 * The circle's fill percentage changes depending on the skill level passed.
 * It visually communicates the user's level in a particular language.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the language or skill to display in the circle
 * @param {"Nativo" | "Avanzado" | "Intermedio" | "Basico"} props.level - The proficiency level
 *
 * @returns {JSX.Element} A stylized circular progress bar with name and level
 */
export const CircularProgressBar = ({ name, level }) => {
	let percentage;
	switch (level) {
		case "Nativo":
			percentage = 100;
			break;
		case "Avanzado":
			percentage = 75;
			break;
		case "Intermedio":
			percentage = 50;
			break;
		case "Basico":
			percentage = 25;
			break;
		default:
			percentage = 75;
			break;
	}

	return (
		<div className="language-circle-container">
			<svg className="circle" viewBox="0 0 36 36">
				<path
					className="bg"
					d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path
					className="progress"
					strokeDasharray={`${percentage}, 100`}
					d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<text x="18" y="20.35" className="percentage-text">
					{name}
				</text>
			</svg>
			<p className="level-label">{level}</p>
		</div>
	);
};
