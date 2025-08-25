import "./Profile.css";
import linkedInLogo from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoPng from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoWebp from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoAvif from "../../assets/icons/linkedin/logo-linkedin.png";

/**
 * Profile component
 *
 * Renders the user’s profile section with contact info, professional summary,
 * and a link to their portfolio and LinkedIn profile. Optionally hides children
 * if the `gameResult.secretNumber` is set to "blocked".
 *
 * Uses:
 * - `children` for additional content (e.g., profile picture or badges) rendered when not blocked
 * - `cvData.personalInfo` to display location, email, portfolio URL, and summary
 * - `gameResult?.secretNumber` to conditionally add CSS class and render children
 * - Responsive picture element for the LinkedIn logo with AVIF, WebP, and PNG fallbacks
 *
 * @param {object} props
 * @param {ReactNode} [props.children]       Optional content displayed above the profile title, hidden when blocked
 * @param {object}     props.cvData          Curriculum data object containing `personalInfo`
 * @param {object}     props.cvData.personalInfo
 * @param {string}     props.cvData.personalInfo.location  User’s location text
 * @param {string}     props.cvData.personalInfo.email     User’s email address
 * @param {string}     props.cvData.personalInfo.portfolio URL to user’s portfolio (opens in new tab)
 * @param {string}     props.cvData.personalInfo.summary   Brief professional summary text
 * @param {object}     [props.gameResult]    Optional game result controlling visibility
 * @param {string}     [props.gameResult.secretNumber]    "blocked" to hide children and add blocked class
 * @returns {JSX.Element} The complete profile section
 */
export const Profile = ({ children, cvData, gameResult }) => {
	return (
		<section className={`profile-section ${gameResult?.secretNumber}`}>
			{gameResult?.secretNumber !== "blocked" && children}
			<h3 className="profile-section-title">PERFIL</h3>
			<div className="profile-section-about">
				<p>
					Ubicacion: <span>{cvData.personalInfo.location}</span>
				</p>
				<p>
					Email: <span>{cvData.personalInfo.email}</span>
				</p>
				<a
					href={cvData.personalInfo.portfolio}
					target="_blank"
					rel="noopener noreferrer"
					className="profile-section-btn"
				>
					Portfolio
				</a>
			</div>

			<div className="profile-section-professional-description">
				<h4 className="subtitle">Perfil Profesional</h4>
				<p>{cvData.personalInfo.summary}</p>
			</div>
			<div className="profile-section-linkedin-link">
				<a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
					<div className="linkedin-logo-container">
						<picture>
							<source src={linkedInLogoAvif} type="image/png" />
							<source src={linkedInLogoWebp} type="image/png" />
							<source src={linkedInLogoPng} type="image/png" />
							<img src={linkedInLogo} alt="Logo LinkedIn" aria-label="Logo of LinkedIn Web" />
						</picture>
					</div>
					<span>LinkedIn</span>
				</a>
			</div>
		</section>
	);
};
