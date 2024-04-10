import { Echo } from "@novu/echo";
import { renderEmail } from "@/emails";

interface EchoProps {
	step: any;
	payload: {
		subject: string;
		message: string;
		firstName: string
	}
}
export const echo = new Echo({
	apiKey: process.env.NEXT_PUBLIC_NOVU_API_KEY!,
	devModeBypassAuthentication: process.env.NODE_ENV === "development",
});

echo.workflow(
	"newsletter",
	async ({ step, payload }: EchoProps) => {
		await step.email(
			"send-email",
			async () => {
				return {
					subject: `${payload ? payload?.subject : "No Subject"}`,
					body: renderEmail(payload),
				};
			},
			{
				inputSchema: {
					type: "object",
					properties: {}
				},
			}
		);
	},
	{
		payloadSchema: {
			type: "object",
			properties: {
				message: { type: "string", default: "This is a test message from Newsletter"},
				subject: { type: "string", default: "Message from Newsletter App"},
				firstName: { type: "string", default: "User" },
			},
			required: ["message", "subject", "firstName"],
			additionalProperties: false,
		}
	}
);