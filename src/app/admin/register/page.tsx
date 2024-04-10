"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminSignUp } from "../../util";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(false)
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setDisabled(true)
		adminSignUp(email, password);
	};
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-8'>
			<h2 className='font-bold text-3xl text-gray-700 mb-3'>Admin Sign Up</h2>
			<form
				className='md:w-2/3 w-full flex flex-col justify-center'
				onSubmit={handleSubmit}
			>
				<label htmlFor='email' className='text-lg'>
					Email
				</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className='w-full py-3 px-6 border-gray-600 border-[1px] rounded-md mb-4'
				/>

				<label htmlFor='password' className='text-lg'>
					Password
				</label>
				<input
					type='password'
					id='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full py-3 px-6 border-gray-600 border-[1px] rounded-md mb-4'
				/>

				<button className='py-3 px-6 rounded-md bg-black text-gray-50' disabled={disabled}>
					Register
				</button>
				<p className="text-md mt-4 text-center">Already have an account? <Link href="/admin/login" className="text-blue-500">Log in</Link></p>
			</form>
		</main>
	);
}