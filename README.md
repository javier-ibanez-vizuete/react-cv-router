# Curriculum Vitae — Javier Ibáñez Vizuete

**By Javier Ibáñez Vizuete**

## Description

**Interactive Curriculum** is a personal/educational project built with **React + Vite** that presents the resume in a dynamic and interactive way. In addition to the classic content (profile, experience, education, skills, and contact), it includes a **CurriculumInteractivo** section with mini-games (Hangman, Whack-a-Mole, Tic Tac Toe, Secret Number) and small animations (confetti, rain effect) to add a playful and memorable touch.

The project's goal is to showcase technical skills (React, modular components, accessibility, and responsive design) while creating an entertaining and professional user experience.

## Links to the site

-   https://javier-ibanez-vizuete-cv.netlify.app
-   https://javier-ibanez-vizuete-cv.vercel.app

## Main features

-   Clean, modular, and **responsive** interface (mobile-first).
-   Navigable sections:
    -   Home: Landing page.
    -   Profile: User data and customization options.
    -   Education.
    -   Experience.
    -   Skills.
    -   Contact: functional form with basic validation.
    -   **CurriculumInteractivo**: internal navigation with mini-games and visual effects.
-   Included mini-games:
    -   Hangman
    -   Whack-a-Mole
    -   Tic Tac Toe
    -   Secret Number
-   Forms with basic validation (Contact section).
-   Animations and effects (confetti, rain) for visual reinforcement.
-   Optimized images (AVIF / WebP / PNG) and organized assets.

## Technologies used

-   **React** (JSX, functional components)
-   **Vite** (bundler / dev server)
-   **JavaScript (ES6+)**
-   **CSS3** (modules / CSS files per component)
-   Notable libraries (according to `package.json`):
    -   `react-confetti` (or others for effects)
    -   any other library listed in `package.json`
-   Image formats: AVIF, WebP, PNG
-   Development tools: ESLint (basic config), Prettier (optional)

## Structure
<details>
<summary><strong>Project structure</strong></summary>

```text
javier-ibanez-vizuete-cv-react/
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public/
│  └─ javier-ibanez-vizuete-cv-favicon.png
├─ src/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets/
│  │  ├─ icons/
│  │  └─ pictures/
│  ├─ components/
│  │  ├─ Button/
│  │  ├─ CircularProgressBar/
│  │  ├─ CongratsScreen/
│  │  ├─ ContactSection/
│  │  ├─ CurriculumComplete/
│  │  ├─ CurriculumInteractive/
│  │  ├─ CurriculumTraditional/
│  │  ├─ CvSelector/
│  │  ├─ DevLanguages/
│  │  ├─ Education/
│  │  ├─ Experience/
│  │  ├─ Footer/
│  │  ├─ Navigation/
│  │  ├─ NightMode/
│  │  ├─ Profile/
│  │  └─ Skills/
│  ├─ helpers/
│  │  └─ localStorage/
│  ├─ index.css
│  ├─ main.jsx
│  └─ utils/
│     ├─ CV_DATA.js
│     ├─ INITIAL_MOLE_STATES.js
│     ├─ LETTERS.js
│     ├─ TIC_TAC_TOE_INITIAL_STATS.js
│     └─ WORDS_DATA.js
└─ vite.config.js
```

</details>

## Screenshots (placeholders)

![Landing Page](/public/screenshots/landing-page.JPG)

_Landing Page_ - Main interface.

![Landing Page Dark](/public/screenshots/landing-page-dark.JPG)

_Landing Page Dark_ - Main interface / Dark mode.

![Curriculum Traditional](/public/screenshots/traditional-cv.JPG)

_Curriculum Traditional_ - Traditional CV interface.

![Intro Curriculum Interactive](/public/screenshots/intro-interactive-cv.JPG)

_Interactive Curriculum Welcome Message_ - Intro to the Interactive Curriculum.

![Curriculum Interactive](/public/screenshots/interactive-cv.JPG)

_Interactive Curriculum_ - Interactive Curriculum interface.

![Contact Form](/public/screenshots/contact-section.JPG)

_Contact Form_ - Contact section.

## Favicon

![Favicon](/public/javier-ibanez-vizuete-cv-favicon.png)

_Favicon_ - Curriculum favicon

## How to use / Run the project

1. Clone the repository:

-   https://github.com/javier-ibanez-vizuete/javier-ibanez-vizuete-cv-react.git

