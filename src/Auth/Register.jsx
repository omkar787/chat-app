// import { signInWithGoogle } from "../firebase-utils/firebase";
import { useAuth } from "../firebase-utils/AuthContext";
import { useState } from "react";

import GoogleLogo from "../static/google.png";

export default function Register() {
	const { signInWithGoogle } = useAuth();
	const [loading, setLoading] = useState(false);

	async function handleSignUpClick() {
		try {
			setLoading(true);
			await signInWithGoogle;
		} catch (error) {
			console.log("An error occured : ", error);
		}

		setLoading(false);
	}

	return (
		<div className="flex justify-center items-center h-screen flex-col">
			<div className="text-3xl font-bold font-mono">Chat app</div>
			<div
				onClick={(e) => {
					signInWithGoogle();
				}}
				disabled={loading}
				className="       flex gap-2 mt-2 items-center shadow-lg shadow-gray-300 border border-gray-300  p-2 rounded-lg  justify-center cursor-pointer"
			>
				<img
					src={GoogleLogo}
					alt="Google Logo"
					width={30}
					height={30}
				/>{" "}
				<div className="font-mono text-xl">Sign in with Google</div>
			</div>
		</div>
	);
}
