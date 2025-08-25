import "./EducationItem.css";

/**
 * EducationItem
 *
 * Renders a single education entry showing the degree, institution, and study period.
 *
 * @param {Object} props
 * @param {Object} props.educationItem - An object representing an education entry.
 * @param {string} props.educationItem.degree - The name of the degree or qualification.
 * @param {string} props.educationItem.institution - The name of the educational institution.
 * @param {string} [props.educationItem.period] - The time period of the studies.
 *
 * @returns {JSX.Element} A formatted education entry.
 */
export const EducationItem = ({ educationItem }) => {
	return (
		<article className="education-item">
			<h3>{educationItem.degree}</h3>
			<h4>{educationItem.institution}</h4>
			<p>{educationItem?.period}</p>
		</article>
	);
};
