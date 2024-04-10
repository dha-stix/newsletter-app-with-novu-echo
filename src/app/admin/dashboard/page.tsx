"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import Newsletters from "@/components/Newsletters";
import SubscribersList from "@/components/SubscribersList";
import { useRouter } from "next/navigation";
import { db, auth } from "../../../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { adminLogOut } from "../../util";

type Subscriber = {
	id: string;
	data: {
		email: string;
		firstName: string;
		lastName: string;
		topics: string[];
	};
};

export default function Dashboard() {
	const router = useRouter();
	const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user?.uid) {
				router.replace("/admin");
			} else {
				fetchAllSubscribers()
			}
		});
	}, [router]);

	const fetchAllSubscribers = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "subscribers"));
			const subs: any = [];
			querySnapshot.forEach((doc) => {
				subs.push({ id: doc.id, data: doc.data() });
			});
			setSubscribers(subs);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const [toggleView, setToggleView] = useState<boolean>(false);
	const handleToggleView = () => setToggleView(!toggleView);
	const handleLogout = () => adminLogOut()

	return (
		<div className='flex w-full min3-h-screen relative'>
			<div className='lg:w-[15%] border-r-2 lg:flex hidden flex-col justify-between min-h-[100vh]'>
				<nav className='fixed p-4 pb-8 flex flex-col justify-between h-screen'>
					<div className='flex flex-col space-y-4'>
						<h3 className='text-2xl font-bold text-blue-500 mb-6'>Dashboard</h3>
						<Link
							href='#subscribers'
							onClick={handleToggleView}
							className={`${
								toggleView ? "" : "bg-blue-400 text-blue-50"
							}  p-3 mb-2 rounded-md`}
						>
							Subscribers
						</Link>
						<Link
							href='#newsletters'
							onClick={handleToggleView}
							className={`${
								!toggleView ? "" : "bg-blue-400 text-blue-50"
							}  p-3 mb-2 rounded-md`}
						>
							Newsletters
						</Link>
					</div>

					<button className='text-red-500 block mt-10' onClick={handleLogout}>
						Log out
					</button>
				</nav>
			</div>

			<main className='lg:w-[85%] w-full bg-white h-full p-4'>
				<div className='flex items-center lg:justify-end justify-between mb-3'>
					<Link
						href='#'
						onClick={handleToggleView}
						className='lg:hidden block text-blue-700'
					>
						{!toggleView ? "View Newsletters" : "View Subscribers"}
					</Link>
					<button className='bg-red-500 text-white px-5 py-3 rounded-md lg:hidden block' onClick={handleLogout}>
						Log Out
					</button>
				</div>
				<div>
					{toggleView ? (
						<Newsletters />
					) : (
						<SubscribersList subscribers={subscribers} />
					)}
				</div>
			</main>
		</div>
	);
}