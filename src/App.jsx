import Home from "./Components/Home";
import { AuthProvider } from "./firebase-utils/AuthContext";
function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Home />
			</div>
		</AuthProvider>
	);
}

export default App;
