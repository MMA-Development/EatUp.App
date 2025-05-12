import { z } from 'zod'

export const PaymentSheetParamsResponseSchema = z.object({
    clientSecret: z.string(),
    ephermalKey: z.string(),
    orderId: z.string().optional()
})

export type PaymentSheetParamsResponse = z.infer<typeof PaymentSheetParamsResponseSchema>

export const PaymentSheetParamsPayloadSchema = z.object({
    userName: z.string(),
    foodPackageId: z.string(),
    price: z.number(),
    foodPackageTitle: z.string(),
    stripeCustomerId: z.string(),
    vendorId: z.string().uuid().nullable()
})
export type PaymentSheetParamsPayload = z.infer<typeof PaymentSheetParamsPayloadSchema>
