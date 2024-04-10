"use client";
import React, { useState } from "react";
import Link from "next/link";
import { adminLogin } from "../../util";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setDisabled(true)
		adminLogin(email, password)
	};
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-8'>
			<h2 className='font-bold text-3xl text-gray-700 mb-3'>Admin Login</h2>
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
					placeholder="test@gmail.com"
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
					placeholder="test123"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full py-3 px-6 border-gray-600 border-[1px] rounded-md mb-4'
				/>

				<button className='py-3 px-6 rounded-md bg-black text-gray-50' disabled={disabled}>
					Log in
				</button>
				<p className="text-md mt-4 text-center">Don&apos;t have an account? <Link href="/admin/register" className="text-blue-500">Create one</Link></p>
			</form>
		</main>
	);
}