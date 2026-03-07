import { X, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Square({ value, onClick, className }) {
	return (
		<div
			className={`w-40 h-40 bg-transparent border-3 border-pearl-bush-200
			font-ubuntu font-bold text-6xl text-pearl-bush-200 flex flex-col 
			items-center justify-center
			max-sm:w-[30vw] max-sm:h-[30vw] ${className}`}
			onClick={onClick}
		>
			<AnimatePresence>
				{value === "X" && (
					<motion.div
						key="X"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 20,
						}}
					>
						<X
							className="w-25 h-25 max-sm:w-[18vw] max-sm:h-[18vw]"
							strokeWidth={3}
						/>
					</motion.div>
				)}
				{value === "O" && (
					<motion.div
						key="O"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 20,
						}}
					>
						<Circle
							className="w-25 h-25 max-sm:w-[18vw] max-sm:h-[18vw]"
							strokeWidth={3}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
