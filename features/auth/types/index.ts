import {z} from 'zod'

export const LoginPayloadSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(4)
})

export type UpdatePayload = z.infer<typeof LoginPayloadSchema>

export const LoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string()
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const MeResponseSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    fullName: z.string(),
    stripeCustomerId: z.string()
})

export type MeResponse = z.infer<typeof MeResponseSchema>