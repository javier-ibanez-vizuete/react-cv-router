import "./Experience.css";

/**
 * Experience
 *
 * Renders a single professional experience entry, including company name, period,
 * location, and a list of responsibilities.
 *
 * @param {Object} props
 * @param {Object} props.experience - Object containing details about the job experience.
 * @param {string} props.experience.company - Name of the company.
 * @param {string} props.experience.period - Duration of the job experience.
 * @param {string} props.experience.location - Location where the job took place.
 * @param {string[]} props.experience.responsabilities - Array of main responsibilities during the job.
 *
 * @returns {JSX.Element} A section with formatted experience data.
 */
export const Experience = ({ experience }) => {
	return (
		<div className="experience-container">
			<h4 className="subtitle">{experience.company}</h4>
			<p>{experience.period}</p>
			<p>{experience.location}</p>
			<div className="experience-responsabilities-container">
				<h4 className="subtitle">Funciones</h4>
				<ul>
					{experience.responsabilities.map((responsability) => {
						return <li key={responsability}>{responsability}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};
