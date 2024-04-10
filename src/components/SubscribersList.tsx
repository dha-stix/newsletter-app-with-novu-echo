"use client";

type Subscriber = {
	id: string;
	data: {
		email: string;
		firstName: string;
		lastName: string;
		topics: string[];
	};
};

export default function SubscribersList({
	subscribers,
}: {
	subscribers: Subscriber[];
}) {
	return (
		<main className='w-full'>
			<section className='flex items-center justify-between mb-4'>
				<h2 className='font-bold text-2xl mb-3'>All Subscribers</h2>
			</section>
			<div className='w-full'>
				<table className='w-full'>
					<thead>
						<tr>
							<th className='py-3'>First Name</th>
							<th className='py-3'>Last Name</th>
							<th className='py-3'>Email Address</th>
						</tr>
					</thead>
					<tbody>
						{subscribers.map((subscriber) => (
							<tr key={subscriber.id}>
								<td className='py-3'>{subscriber.data.firstName}</td>
								<td className='py-3'>{subscriber.data.lastName}</td>
								<td className='py-3'>{subscriber.data.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}