import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		return await signInWithPopup(auth, provider);
	}

	function signOut() {
		currentUser ? auth.signOut() : null;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLoading(false);
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = { currentUser, signInWithGoogle, signOut };

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
