import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"

export async function readCliInput(prompt: string): Promise<string> {
    const rl = createInterface({ input: stdin, output: stdout })
    try {
        return (await rl.question(prompt)).trim()
    } finally {
        rl.close()
    }
}
