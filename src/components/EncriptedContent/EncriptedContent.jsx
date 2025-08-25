import "./EncriptedContent.css";

/**
 * EncriptedContent
 *
 * Displays a blocked or encrypted message with a secondary note indicating it's unavailable.
 *
 * @param {Object} props
 * @param {string} props.bodyText - Main text to be displayed as the encrypted content.
 *
 * @returns {JSX.Element} A styled container showing unavailable content.
 */
export const EncriptedContent = ({ bodyText }) => {
	return (
		<div className="encripted-content">
			<span>{bodyText}</span>
			<span>(No disponible)</span>
		</div>
	);
};
