import React from "react";

export default function ChatMessage({ msg, owner }) {
	return (
		<div
			className={`flex items-center gap-2 px-3 justify-start  ${
				owner ? "flex-row-reverse" : ""
			}`}
		>
			<div>
				<img
					width={35}
					height={35}
					className="rounded-full"
					src={msg.photoURL}
					alt={"Icon"}
				/>
			</div>
			<div className="bg-slate-300 px-2 rounded-3xl py-2">{msg.msg}</div>
		</div>
	);
}
