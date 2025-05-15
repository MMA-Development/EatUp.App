import {z} from 'zod'

export const OrdersPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
    search: z.string()
})

export type OrdersPayload = z.infer<typeof OrdersPayloadSchema>

export const OrdersResponseSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            userId: z.string(),
            userName: z.string(),
            vendorId: z.string(),
            foodPackageId: z.string(),
            foodPackageTitle: z.string(),
            paymentStatus: z.string(),
            paymentId: z.string(),
            price: z.number(),
            quantity: z.number(),
            createdAt: z.string()
        })
    ),
    totalCount: z.number(),
    page: z.number()
})

export type OrdersResponse = z.infer<typeof OrdersResponseSchema>
