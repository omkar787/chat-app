import React, { useEffect, useState } from "react";
import { useAuth } from "../firebase-utils/AuthContext";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
	Timestamp,
	onSnapshot,
} from "firebase/firestore";
import app from "../firebase-utils/firebase";
import ChatMessage from "./ChatMessage";

import SendIcon from "../static/send.png";
import SignOutIcon from "../static/signout.png";

export default function () {
	const { currentUser, signOut } = useAuth();
	const [messages, setMessages] = useState([]);

	async function sendMessage(msg) {
		try {
			const db = getFirestore(app);
			const doc = await addDoc(collection(db, "messages"), {
				email: currentUser.email,
				photoURL: currentUser.photoURL,
				uid: currentUser.uid,
				msg: msg,
				createdAt: Timestamp.now(),
			});
			// console.log("Added ID : ", doc.id);
		} catch (error) {
			console.log("error : ", error);
		}
	}

	function getMessages() {
		const db = getFirestore(app);

		const q = query(
			collection(db, "messages"),
			orderBy("createdAt", "desc"),
			limit(25)
		);
		const unsub = onSnapshot(q, (querySnapshot) => {
			const msg = [];
			querySnapshot.forEach((doc) => {
				msg.push({ ...doc.data(), id: doc.id });
			});
			if (msg.length) {
				setMessages(msg.reverse());
			}
		});

		return unsub;
	}

	useEffect(() => {
		const unsub = getMessages();
		return unsub;
	}, []);

	function handleOnSubmit(e) {
		e.preventDefault();
		const msg = e.target.message.value.trim();

		if (msg.length) {
			sendMessage(msg);
			e.target.message.value = "";
		}
	}

	useEffect(() => {
		const chatBox = document.getElementById("chatbox");
		if (chatBox) {
			chatBox.scrollTop = chatBox.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="h-screen flex flex-col items-center md:pt-5">
			{/* <div>Chat App</div> */}
			<div className="w-full md:w-2/4 max-h-full h-screen ">
				<div className="bg-gray-200 flex items-center justify-between  ">
					<div className="flex items-center gap-3 pl-3">
						{/* <img
							className="rounded-full"
							width={20}
							height={20}
							src={currentUser.photoURL}
						/> */}

						<div className="text-xl">
							Welcome, {currentUser.displayName}
						</div>
					</div>

					<div
						className="cursor-pointer bg-red-400 py-3 px-5"
						onClick={signOut}
					>
						<img
							width={30}
							height={30}
							src={SignOutIcon}
							alt="Sign Out Icon"
						/>
					</div>
				</div>

				<div
					id="chatbox"
					style={{
						minHeight: "24rem",
					}}
					className="bg-yellow-200 h-full less-scrollbar    md:max-h-96 overflow-auto flex flex-col justify-start gap-5 py-2"
				>
					{messages.map((doc) => (
						<ChatMessage
							key={doc.id}
							msg={doc}
							owner={doc.uid === currentUser.uid}
						/>
					))}
				</div>

				<form onSubmit={handleOnSubmit} className="flex">
					<input
						className="bg-slate-200  w-full outline-none px-5"
						type="text"
						name="message"
						id="message"
						autoComplete="off"
						required
						placeholder="Hey, What's Up"
					/>
					<button className="bg-emerald-400 px-4 py-3" type="submit">
						<img
							width={30}
							height={30}
							src={SendIcon}
							alt="Send Icon"
						/>
					</button>
				</form>

				<div className="text-center">
					Made with 💙 by{" "}
					<a
						className="text-blue-600 font-bold"
						href="https://github.com/omkar787"
						target="_blank"
					>
						Omkar
					</a>
				</div>
			</div>
		</div>
	);
}
