import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Game from "./pages/Game";

function App() {
	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<Routes>
				<Route path="/" element={<Game></Game>}></Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
