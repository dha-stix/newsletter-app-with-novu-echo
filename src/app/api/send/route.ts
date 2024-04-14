import { SubscribersData } from "../../util";
import { NextRequest, NextResponse } from "next/server";
import { SubscribersData } from "../../util";
import { Novu } from "@novu/node";

//👇🏻 Novu SDK for sending emails
const novu = new Novu(process.env.NOVU_API_KEY!);

export async function POST(req: NextRequest) {
	const { subject, message, subscribers } = await req.json();

	subscribers.forEach(async (subscriber: SubscribersData) => {
		const { data } = await novu.trigger("newsletter", {
			to: {
				subscriberId: subscriber.subscriberId,
				email: subscriber.email,
				firstName: subscriber.firstName,
				lastName: subscriber.lastName,
			},
			payload: {
				subject,
				message,
				firstName: subscriber.firstName,
			},
		});
		console.log(data);
	});

	return NextResponse.json(
		{
			message: "Emails sent successfully",
			success: true,
		},
		{ status: 200 }
	);
}
