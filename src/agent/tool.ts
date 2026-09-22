import { tool } from "ai"
import { z } from "zod"
import { readCliInput } from "../cli"

export const readEmail = tool({
    description:
        "Read the next incoming email from the command line. Use this when you need to see what the user sent.",
    inputSchema: z.object({
        reason: z
            .string()
            .optional()
            .describe("Why you need to read the next email"),
    }),
    execute: async () => {
        console.log("\n--- Incoming email ---")
        const from = await readCliInput("From: ")
        const subject = await readCliInput("Subject: ")
        const body = await readCliInput("Body: ")

        return { from, subject, body }
    },
})

export const tools = {
    readEmail,
}
