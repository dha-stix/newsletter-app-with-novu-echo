import { NextRequest, NextResponse } from "next/server";
import { Novu } from "@novu/node";
const novu = new Novu(process.env.NOVU_API_KEY!);

const generateSubscriberID = (): string =>
	Math.random().toString(36).substring(2, 10);

export async function POST(req: NextRequest) {
	const { _email, last_name, first_name } = await req.json();

	try {
		const result = await novu.subscribers.identify(generateSubscriberID(), {
			email: _email,
			firstName: first_name,
			lastName: last_name,
		});

		const { data } = await result.data;
		const { subscriberId, firstName, lastName, email, id } = data;

		return NextResponse.json(
			{
				message: "Subscriber Created!",
				data: { subscriberId, firstName, lastName, email, id },
			},
			{ status: 200 }
		);
	} catch (e) {
        return NextResponse.json({ message: "An error occurred", error: e }, { status: 500 })
	}
}