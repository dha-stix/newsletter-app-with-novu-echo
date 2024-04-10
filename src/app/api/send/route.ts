import { NextRequest, NextResponse } from "next/server";
import { Novu } from "@novu/node";
import { Echo } from "@novu/echo";
import { SubscribersData } from "../../util";
const novu = new Novu(process.env.NOVU_API_KEY!);

export const echo = new Echo({
	apiKey: process.env.NOVU_API_KEY!,
	devModeBypassAuthentication: process.env.NODE_ENV === "development",
});

export async function POST(req: NextRequest) {
    const { subject, message, subscribers } = await req.json();

    let status = true
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
        if (!data.data.transactionId) {
            status = false
        }
    });

    if (status) {
			return NextResponse.json(
                {
                    message: "Emails sent successfully", success: true,
                },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ message: "Emails not sent", success: false },
				{ status: 500 }
			);
		}
}