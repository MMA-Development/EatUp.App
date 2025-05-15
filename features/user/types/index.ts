import {z} from 'zod'

export const UpdatePayloadSchema = z.object({
    email: z.string().email().trim(),
    fullName: z.string().trim()
})

export type UpdatePayload = z.infer<typeof UpdatePayloadSchema>
