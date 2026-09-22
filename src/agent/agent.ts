import { createAnthropic } from "@ai-sdk/anthropic"
import { ToolLoopAgent } from "ai"
import { z } from "zod"
import { applicationSchema } from "../application"
import { tools } from "./tool"

export const client = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

export const agent = new ToolLoopAgent({
    model: client("claude-opus-4-5"),
    callOptionsSchema: z.object({
        application: applicationSchema,
    }),
    instructions:
        "You are a loan application assistant. Use the application context to decide what is still missing. Ask the borrower for those items through the command line. Use the readEmail tool to collect their replies.",
    prepareCall: ({ options, ...settings }) => ({
        ...settings,
        instructions: `${settings.instructions}

Current application:
${JSON.stringify(options.application, null, 2)}

Based on this application, ask the user for any missing documents or information. Pending documents still need to be requested.`,
    }),
    tools,
})
