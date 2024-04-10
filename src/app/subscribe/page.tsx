"use client";
import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user?.uid) {
				router.replace("/");
			}
		});
	}, [router]);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				router.push("/");
			})
			.catch((error) => {
				console.error({ error });
				alert("An error occurred, please try again");
			});
	};

	return (
		<main className='p-8 min-h-screen flex flex-col items-center justify-center'>
			<h3 className='text-3xl font-bold mb-4'>You&apos;ve Subscribed!</h3>
			<button
				className='bg-black text-gray-50 px-8 py-4 rounded-md w-[200px]'
				onClick={handleSignOut}
			>
				Back
			</button>
		</main>
	);
}