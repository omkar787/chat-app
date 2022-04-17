import React from "react";
import Register from "../Auth/Register";
import { useAuth } from "../firebase-utils/AuthContext";
import Chat from "./Chat";

export default function Home() {
	const { currentUser } = useAuth();

	return (
		<div className="font-mono">{currentUser ? <Chat /> : <Register />}</div>
	);
}
