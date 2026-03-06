import Square from "./Square";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import WinningLines from "./WinningLine";

export default function Board({ board, handleClick, gameLocked, winningLine }) {
	return (
		<div className="relative grid grid-cols-3 w-fit border-3 border-pearl-bush-200">
			{board.map((row, r) =>
				row.map((cell, c) => (
					<Square
						key={`${r}-${c}`}
						value={cell}
						onClick={() => {
							if (gameLocked) toast.error("It's not your move!");
							else handleClick(r, c);
						}}
						className={
							gameLocked ? "cursor-not-allowed" : "cursor-pointer"
						}
					/>
				)),
			)}
			<WinningLines winnerLine={winningLine} />
		</div>
	);
}
