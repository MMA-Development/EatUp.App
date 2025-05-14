import {z} from 'zod'

export const VendorsPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
    longitude: z.number(),
    latitude: z.number(),
    radius: z.number(),
    search: z.string()
})

export type VendorsPayload = z.infer<typeof VendorsPayloadSchema>

export const VendorsResponseSchema = z.object({
    items: z.array(
        z.object({
            name: z.string(),
            logo: z.string(),
            cvr: z.string(),
            username: z.string(),
            email: z.string(),
            longitude: z.number(),
            latitude: z.number()
        })
    ),
    totalCount: z.number(),
    page: z.number()
})

export type VendorsResponse = z.infer<typeof VendorsResponseSchema>
