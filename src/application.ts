import { z } from "zod"

export const applicationSchema = z.object({
    status: z.enum(["incomplete", "complete"]),
    borrower: z.object({
        name: z.string(),
        email: z.string(),
    }),
    docs: z.array(
        z.object({
            status: z.enum(["pending", "received", "review", "approved"]),
            type: z.enum(["pnl", "tax"]),
        }),
    ),
})

export type Application = z.infer<typeof applicationSchema>
