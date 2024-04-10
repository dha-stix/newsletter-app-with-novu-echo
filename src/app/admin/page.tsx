import Link from "next/link";

export default function Admin() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-8'>
			<h2 className='text-3xl font-bold mb-6'>Admin Panel</h2>

			<Link
				href='/admin/register'
				className='py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50'
			>
				Sign Up as an Admin
			</Link>

			<Link
				href='/admin/login'
				className='py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50'
			>
				Log in as an Admin
			</Link>
		</main>
	);
}