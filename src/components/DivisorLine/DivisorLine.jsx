import "./DivisorLine.css";

/**
 * DivisorLine
 *
 * Renders a customizable divider line which can be horizontal or vertical,
 * with adjustable thickness.
 *
 * @param {Object} props
 * @param {boolean} props.horizontalLine - If true, renders a horizontal line.
 * @param {boolean} props.verticalLine - If true, renders a vertical line.
 * @param {number} props.thickness - Thickness of the line in pixels.
 *
 * @returns {JSX.Element} A styled div representing the divider line.
 */
export const DivisorLine = ({ horizontalLine, verticalLine, thickness }) => {
	const style = {};

	if (verticalLine && typeof thickness === "number") style.width = `${thickness}px`;
	if (horizontalLine && typeof thickness === "number") style.height = `${thickness}px`;

	return (
		<div
			className={`divisor-line ${horizontalLine ? "horizontal-line" : ""} ${verticalLine ? "vertical-line" : ""}`}
			style={style}
		></div>
	);
};
