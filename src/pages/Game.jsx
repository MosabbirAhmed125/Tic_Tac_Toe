import Board from "../components/Board";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Circle, Github } from "lucide-react";

export default function Game() {
	const [board, setBoard] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]);
	const [isFinished, setIsFinished] = useState(false);
	const [gameLocked, setGameLocked] = useState(false);
	const [winningLine, setWinningLine] = useState(null);
	const [winner, setWinner] = useState(null);
	const [showDifficultyModal, setShowDifficultyModal] = useState(true);
	const [difficulty, setDifficulty] = useState(null);
	const [showWinnerModal, setShowWinnerModal] = useState(false);

	function handleClick(r, c) {
		if (gameLocked) return;

		if (board[r][c] !== "") {
			toast.error("Invalid Move!");
			return;
		}

		const newBoard = board.map((row) => [...row]);
		newBoard[r][c] = "X";
		setBoard(newBoard);

		setGameLocked(true);

		let result = checkWinner(newBoard);

		if (result != null) {
			setWinningLine(result.line);
			setGameLocked(true);
			setTimeout(() => {
				finishGame(result.winner);
			}, 2000);
			return;
		}

		toast.promise(
			new Promise((resolve) => {
				setTimeout(() => {
					const boardAfterAI = newBoard.map((row) => [...row]);
					const bestMove = findBestMove(boardAfterAI);

					if (bestMove) {
						boardAfterAI[bestMove.r][bestMove.c] = "O";
						setBoard(boardAfterAI);
					}

					let result = checkWinner(boardAfterAI);

					if (result != null) {
						setGameLocked(true);
						setWinningLine(result.line);
						setTimeout(() => finishGame(result.winner), 1000);
					} else {
						setGameLocked(false);
					}

					resolve();
				}, 1000);
			}),
			{
				loading: "AI is thinking...",
				success: "",
			},
		);
	}

	function resetBoard() {
		setShowWinnerModal(false);

		setTimeout(() => {
			setBoard([
				["", "", ""],
				["", "", ""],
				["", "", ""],
			]);
			setWinningLine(null);
			setGameLocked(false);
			setIsFinished(false);
			setWinner(null);
		}, 400);
	}

	function finishGame(winner) {
		if (winner === "O") setWinner("O");
		else if (winner === "X") setWinner("X");
		else setWinner(null);

		setIsFinished(true);
		setShowWinnerModal(true);
	}

	function checkWinner(board) {
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0] &&
				board[i][0] === board[i][1] &&
				board[i][1] === board[i][2]
			) {
				return { winner: board[i][0], line: ["row", i] };
			}
		}

		for (let i = 0; i < 3; i++) {
			if (
				board[0][i] &&
				board[0][i] === board[1][i] &&
				board[1][i] === board[2][i]
			) {
				return { winner: board[0][i], line: ["col", i] };
			}
		}

		if (
			board[0][0] &&
			board[0][0] === board[1][1] &&
			board[1][1] === board[2][2]
		) {
			return { winner: board[0][0], line: ["diag", 0] };
		}

		if (
			board[0][2] &&
			board[0][2] === board[1][1] &&
			board[1][1] === board[2][0]
		) {
			return { winner: board[0][2], line: ["diag", 1] };
		}

		if (board.flat().every((cell) => cell !== "")) {
			return { winner: "draw", line: null };
		}

		return null;
	}

	function minimax(board, isMaximizing) {
		let result = checkWinner(board);

		if (result != null) {
			if (result.winner === "O") return 1;
			if (result.winner === "X") return -1;
			if (result.winner === "draw") return 0;
		}

		if (isMaximizing) {
			let bestScore = -Infinity;

			for (let r = 0; r < board.length; r++) {
				for (let c = 0; c < board[r].length; c++) {
					if (board[r][c] === "") {
						board[r][c] = "O";
						let score = minimax(board, false);
						board[r][c] = "";
						bestScore = Math.max(bestScore, score);
					}
				}
			}

			return bestScore;
		} else {
			let bestScore = Infinity;

			for (let r = 0; r < board.length; r++) {
				for (let c = 0; c < board[r].length; c++) {
					if (board[r][c] === "") {
						board[r][c] = "X";
						let score = minimax(board, true);
						board[r][c] = "";
						bestScore = Math.min(bestScore, score);
					}
				}
			}

			return bestScore;
		}
	}

	function findBestMove(board) {
		let mistakeProb;
		switch (difficulty) {
			case "easy":
				mistakeProb = 0.6;
				break;
			case "medium":
				mistakeProb = 0.35;
				break;
			case "hard":
			default:
				mistakeProb = 0;
		}

		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[r].length; c++) {
				if (board[r][c] === "") {
					board[r][c] = "O";
					const score = minimax(board, false);
					board[r][c] = "";
					moves.push({ r, c, score });
				}
			}
		}

		if (moves.length === 0) return null;

		moves.sort((a, b) => b.score - a.score);
		const bestScore = moves[0].score;

		const rand = Math.random();
		let suboptimalMoves = [];

		switch (difficulty) {
			case "easy":
				suboptimalMoves = moves.filter(
					(move) => move.score < bestScore,
				);
				break;
			case "medium":
				suboptimalMoves = moves.slice(1);
				break;
			case "hard":
				break;
		}

		if (rand < mistakeProb && suboptimalMoves.length > 0) {
			const mistakeMove =
				suboptimalMoves[
					Math.floor(Math.random() * suboptimalMoves.length)
				];
			return { r: mistakeMove.r, c: mistakeMove.c };
		}

		return { r: moves[0].r, c: moves[0].c };
	}

	return (
		<div className="bg-cod-gray-950 h-screen flex flex-col items-center justify-center max-sm:justify-center max-sm:py-10">
			<div className="flex items-center group max-sm:relative">
				<img
					src="icon.svg"
					alt="icon"
					className="w-20 h-20 mr-7 transition-opacity ease-in-out 
					duration-300 group-hover:opacity-0 absolute max-sm:w-14 max-sm:h-14"
				/>
				<img
					src="icon_alt.svg"
					alt="icon_alt"
					className="w-20 h-20 mr-7 transition-opacity ease-in-out 
					duration-300 opacity-0 group-hover:opacity-100 absolute max-sm:w-14 max-sm:h-14"
				/>
				<div className="relative ml-24 max-sm:ml-20 flex flex-col">
					<p className="font-bungee text-6xl text-red-ribbon-500 max-sm:text-4xl leading-tight">
						Tic Tac Toe
					</p>
					<p className="font-borel text-lg text-pearl-bush-200 text-center mt-1">
						by mosabbir ahmed
					</p>
				</div>
			</div>
			<br className="max-sm:hidden" />
			<br className="max-sm:hidden" />

			<div className="max-sm:mt-10 max-sm:mb-10">
				<Board
					board={board}
					handleClick={handleClick}
					gameLocked={gameLocked}
					winningLine={winningLine}
				></Board>
			</div>

			<AnimatePresence>
				{showDifficultyModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center max-sm:bg-cod-gray-950">
						<motion.div
							className="absolute w-160 h-180 bg-cod-gray-950 border-3 border-pearl-bush-200 
	            			rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-pearl-bush-200/50
							max-sm:relative max-sm:w-[92vw] max-sm:h-auto max-sm:py-16 max-sm:px-6"
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
								mass: 0.8,
							}}
						>
							<p
								className="scale-110 text-5xl text-red-ribbon-500 font-bungee 
								flex items-center justify-center gap-3 mb-15
								max-sm:scale-100 max-sm:text-4xl max-sm:mb-8"
							>
								Welcome!
							</p>
							<p
								className="scale-110 text-3xl text-pearl-bush-200 font-ubuntu 
                			font-bold flex items-center justify-center gap-3 mb-15
							max-sm:scale-100 max-sm:text-2xl max-sm:mb-8 max-sm:text-center"
							>
								Select a difficulty level
							</p>

							<button
								className="scale-110 font-bungee text-cod-gray-950 text-[18px] bg-green-500 bg-center 
								rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out 
								hover:bg-pearl-bush-200 hover:text-green-500 hover:shadow-green-500/50 hover:shadow-lg 
								hover:scale-120 w-40 h-12 cursor-pointer mb-7
								max-sm:scale-100 max-sm:mb-4 max-sm:hover:scale-105
								max-sm:active:bg-pearl-bush-200 max-sm:active:text-green-500 max-sm:active:scale-95"
								onClick={() => {
									setDifficulty("easy");
									setShowDifficultyModal(false);
								}}
							>
								Easy
							</button>
							<button
								className="scale-110 font-bungee text-cod-gray-950 text-[18px] bg-amber-400 bg-center 
								rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out 
								hover:bg-pearl-bush-200 hover:text-amber-400 hover:shadow-amber-400/50 hover:shadow-lg 
								hover:scale-120 w-40 h-12 cursor-pointer mb-7
								max-sm:scale-100 max-sm:mb-4 max-sm:hover:scale-105
								max-sm:active:bg-pearl-bush-200 max-sm:active:text-amber-400 max-sm:active:scale-95"
								onClick={() => {
									setDifficulty("medium");
									setShowDifficultyModal(false);
								}}
							>
								Medium
							</button>
							<button
								className="scale-110 font-bungee text-cod-gray-950 text-[18px] bg-red-ribbon-500 bg-center 
								rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out 
								hover:bg-pearl-bush-200 hover:text-red-ribbon-500 hover:shadow-red-ribbon-500/50 hover:shadow-lg 
								hover:scale-120 w-40 h-12 cursor-pointer
								max-sm:scale-100 max-sm:hover:scale-105
								max-sm:active:bg-pearl-bush-200 max-sm:active:text-red-ribbon-500 max-sm:active:scale-95"
								onClick={() => {
									setDifficulty("hard");
									setShowDifficultyModal(false);
								}}
							>
								Hard
							</button>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showWinnerModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center max-sm:bg-cod-gray-950">
						<motion.div
							className="absolute w-160 h-180 bg-cod-gray-950 border-3 border-pearl-bush-200 
	            			rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-pearl-bush-200/50
							max-sm:relative max-sm:w-[92vw] max-sm:h-auto max-sm:py-16 max-sm:px-6"
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
								mass: 0.8,
							}}
						>
							<p
								className="scale-125 text-4xl text-pearl-bush-200 font-ubuntu 
                			font-bold flex items-center justify-center gap-3 mb-15
							max-sm:scale-100 max-sm:text-xl max-sm:mb-8 max-sm:flex-wrap max-sm:justify-center max-sm:text-center max-sm:gap-2"
							>
								{winner === null ? (
									"Draw!"
								) : (
									<>
										Player{" "}
										{winner === "X" ? (
											<X
												size={50}
												strokeWidth={3}
												className="text-red-ribbon-500"
											/>
										) : (
											<Circle
												size={50}
												strokeWidth={3}
												className="text-red-ribbon-500"
											/>
										)}{" "}
										has won!
									</>
								)}
							</p>

							<button
								className="scale-125 font-bungee text-pearl-bush-200 text-[18px] bg-red-ribbon-500 bg-center 
								rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out 
								hover:bg-pearl-bush-200 hover:text-red-ribbon-500 hover:shadow-red-ribbon-500/50 hover:shadow-lg 
								hover:scale-135 w-40 h-12 cursor-pointer mb-5
								max-sm:scale-100 max-sm:hover:scale-105
								max-sm:active:bg-pearl-bush-200 max-sm:active:text-red-ribbon-500 max-sm:active:scale-95"
								onClick={() => resetBoard()}
							>
								Restart
							</button>
							<br />
							<button
								className="scale-125 font-bungee text-pearl-bush-200 text-[18px] bg-sky-600 bg-center 
								rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out 
								hover:bg-pearl-bush-200 hover:text-sky-600 hover:shadow-sky-600/50 hover:shadow-lg 
								hover:scale-135 w-40 h-12 cursor-pointer
								max-sm:scale-100 max-sm:hover:scale-105
								max-sm:active:bg-pearl-bush-200 max-sm:active:text-sky-600 max-sm:active:scale-95"
								onClick={() => {
									resetBoard();
									setShowDifficultyModal(true);
								}}
							>
								Main Menu
							</button>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<a
				href="https://github.com/MosabbirAhmed125/Tic_Tac_Toe"
				target="_blank"
				rel="noopener noreferrer"
				className="flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-3 text-red-ribbon-500 text-base font-ubuntu font-bold hover:underline hover:underline-offset-4"
			>
				<div className="w-8 h-8 bg-pearl-bush-200 flex items-center justify-center rounded-md">
					<img src="/github.svg" alt="GitHub" className="w-5 h-5" />
				</div>
				View Source Code
			</a>
		</div>
	);
}
