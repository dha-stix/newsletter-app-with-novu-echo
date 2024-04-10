"use client";
import { GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import { googleProvider, githubProvider } from "../../firebase";
import { handleSignIn } from "./util";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false)

	const handleGoogleSignIn = () => {
		setLoading(true)
		handleSignIn(googleProvider, GoogleAuthProvider);
	}

	const handleGithubSignIn = () => {
		setLoading(true)
		handleSignIn(githubProvider, GithubAuthProvider);
	}

	return (
		<main className='flex h-screen flex-col p-8 items-center justify-center'>
			<h2 className='text-3xl font-bold mb-6'>Sign up to the Newsletter</h2>

			<button
				className='py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50'
				onClick={handleGithubSignIn}
				disabled={loading}
			>
				<FaGithub className='inline-block mr-2' />
				
				{loading ? "Signing in..." : "Sign Up with Github"}
			</button>

			<button
				className='py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50'
				onClick={handleGoogleSignIn}
				disabled={loading}
			>
				<FaGoogle className='inline-block mr-2' />
				{loading ? "Signing in..." : "Sign Up with Google"  }
			</button>
			
		</main>
	);
}