import type { ModelMessage } from "ai"
import { agent } from "./agent/agent"
import type { Application } from "./application"
import { readCliInput } from "./cli"

const application: Application = {
    docs: [{
        status: "pending",
        type: "tax",
    }],
    status: "incomplete",
    borrower: {
        name: "axel",
        email: "axescalada@gmail.com",
    },
}

async function main() {
    const messages: ModelMessage[] = []

    console.log("Casca agent. Type a message, or 'exit' to quit.")
    console.log("The agent uses the application to decide what to ask, and can collect replies with readEmail.\n")

    while (true) {
        const input = await readCliInput("You: ")
        if (!input || input.toLowerCase() === "exit") {
            break
        }

        messages.push({ role: "user", content: input })

        const result = await agent.generate({
            messages,
            options: { application },
        })
        messages.push(...result.responseMessages)

        console.log(`Agent: ${result.text}\n`)
    }
}

main()
