import { motion } from "framer-motion";

export default function WinningLines({ winnerLine }) {
	const LINE_COLOR = "bg-red-ribbon-500";

	const lines = {
		row0: (
			<motion.span
				className={`absolute top-18 left-3 ${LINE_COLOR} w-114 h-3 rounded-xl`}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		row1: (
			<motion.span
				className={`absolute left-3 ${LINE_COLOR} w-114 h-3 rounded-xl top-1/2 -translate-y-1/2`}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		row2: (
			<motion.span
				className={`absolute bottom-19 left-3 ${LINE_COLOR} w-114 h-3 rounded-xl`}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		col0: (
			<motion.span
				className={`absolute top-3 bottom-3 left-18.5 ${LINE_COLOR} w-3 rounded-xl`}
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		col1: (
			<motion.span
				className={`absolute top-3 bottom-3 left-58.5 ${LINE_COLOR} w-3 rounded-xl`}
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		col2: (
			<motion.span
				className={`absolute top-3 bottom-3 left-98.5 ${LINE_COLOR} w-3 rounded-xl`}
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		diag0: (
			<motion.span
				className={`absolute top-2 left-4 ${LINE_COLOR} w-160 h-3 rounded-xl rotate-45 origin-top-left`}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
		diag1: (
			<motion.span
				className={`absolute top-2 right-4 ${LINE_COLOR} w-160 h-3 rounded-xl -rotate-45 origin-top-right`}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5 }}
			/>
		),
	};

	let lineKey = null;
	if (winnerLine) {
		const [type, index] = winnerLine;
		if (type === "row") lineKey = `row${index}`;
		if (type === "col") lineKey = `col${index}`;
		if (type === "diag") lineKey = `diag${index}`;
	}

	return <>{lineKey && lines[lineKey]}</>;
}
