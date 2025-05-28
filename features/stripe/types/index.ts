import { z } from 'zod'

export const PaymentSheetParamsResponseSchema = z.object({
    clientSecret: z.string(),
    ephemeralKey: z.string(),
    orderId: z.string().optional()
})

export type PaymentSheetParamsResponse = z.infer<typeof PaymentSheetParamsResponseSchema>

export const PaymentSheetParamsPayloadSchema = z.object({
    userId: z.string(),
    foodPackageId: z.string().uuid(),
    price: z.number(),
    vendorId: z.string().uuid(),
    quantity: z.number()
})
export type PaymentSheetParamsPayload = z.infer<typeof PaymentSheetParamsPayloadSchema>
