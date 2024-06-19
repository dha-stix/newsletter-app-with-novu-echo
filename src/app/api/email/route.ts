import { serve } from "@novu/framework/next";
import { client, emailWorkflow } from "../../novu/workflows";

export const { GET, POST, PUT } = serve({ client, workflows: [emailWorkflow] });
