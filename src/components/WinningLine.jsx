import { motion } from "framer-motion";

export default function WinningLines({ winnerLine }) {
	if (!winnerLine) return null;

	const [type, index] = winnerLine;

	const lineMap = {
		row: [
			{ x1: 0.08, y1: 0.5, x2: 2.92, y2: 0.5 },
			{ x1: 0.08, y1: 1.5, x2: 2.92, y2: 1.5 },
			{ x1: 0.08, y1: 2.5, x2: 2.92, y2: 2.5 },
		],
		col: [
			{ x1: 0.5, y1: 0.08, x2: 0.5, y2: 2.92 },
			{ x1: 1.5, y1: 0.08, x2: 1.5, y2: 2.92 },
			{ x1: 2.5, y1: 0.08, x2: 2.5, y2: 2.92 },
		],
		diag: [
			{ x1: 0.12, y1: 0.12, x2: 2.88, y2: 2.88 },
			{ x1: 2.88, y1: 0.12, x2: 0.12, y2: 2.88 },
		],
	};

	const coords = lineMap[type]?.[index];
	if (!coords) return null;

	return (
		<svg
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox="0 0 3 3"
			preserveAspectRatio="none"
		>
			<motion.line
				x1={coords.x1}
				y1={coords.y1}
				x2={coords.x2}
				y2={coords.y2}
				stroke="#e83c49"
				strokeWidth="0.12"
				strokeLinecap="round"
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: 1 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			/>
		</svg>
	);
}
