import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Game from "./pages/Game";

function App() {
	return (
		<div>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					className: "font-ubuntu font-bold",
					style: {
						background: "#e4dbcb",
						color: "#111211",
						border: "none",
					},
					iconTheme: {
						primary: "#111211",
						secondary: "#e4dbcb",
					},
					success: {
						iconTheme: {
							primary: "#111211",
							secondary: "#e4dbcb",
						},
					},
					error: {
						iconTheme: {
							primary: "#e83c49",
							secondary: "#e4dbcb",
						},
					},
				}}
			/>
			<Routes>
				<Route path="/" element={<Game></Game>}></Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
