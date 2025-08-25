import { CircularProgressBar } from "../CircularProgressBar/CiruclarProgressBar";
import { EducationItem } from "./EducationItem/EducationItem";
import "./EducationList.css";

/**
 * EducationList
 *
 * Displays a list of education entries and associated technologies.
 *
 * @param {Object} props
 * @param {Object} props.cvData - The curriculum data.
 * @param {Array} props.cvData.education - List of education entries, each containing at least a degree.
 * @param {Array} props.cvData.technologies - List of technology skills with a name and a level.
 *
 * @returns {JSX.Element} A list of education items and a technologies section with progress bars.
 */
export const EducationList = ({ cvData }) => {
	const { education, technologies } = cvData;
	return (
		<>
			{education.map((educationItem) => {
				return <EducationItem key={educationItem.degree} educationItem={educationItem} />;
			})}
			<div className="education-list-tecnologies-container">
				<h3 className="subtitle">Tecnologias</h3>
				<div>
					{technologies.map((technology) => {
						const { name, level } = technology;
						return <CircularProgressBar key={`${name}-${level}`} name={name} level={level} />;
					})}
				</div>
			</div>
		</>
	);
};
