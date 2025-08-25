import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const INITIAL_WINDOW_SIZE = {
	width: window.innerWidth,
	height: window.innerHeight,
};

/**
 * FullscreenConfetti component
 *
 * Renders a full-window confetti animation that automatically adjusts
 * to the current viewport size. Listens for window resize events to
 * update its dimensions and ensure the confetti always covers the
 * entire browser window.
 *
 * Uses:
 * - `window.innerWidth` and `window.innerHeight` for initial size
 * - `useState` to hold the current width/height
 * - `useEffect` to subscribe to resize events and clean up on unmount
 *
 * @returns {JSX.Element} A ReactConfetti element sized to fill the viewport
 */
export const FullscreenConfetti = () => {
	const [windowSize, setWindowSize] = useState(INITIAL_WINDOW_SIZE);

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return <ReactConfetti width={windowSize.width} height={windowSize.height} />;
};
