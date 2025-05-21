import { z } from 'zod'

export const MealSchema = z.object({
    id: z.string(),
    vendorId: z.string(),
    vendorName: z.string(),
    title: z.string(),
    originalPrice: z.number(),
    price: z.number(),
    description: z.string(),
    quantity: z.number(),
    maxOrderQuantity: z.number(),
    firstAvailablePickup: z.string(),
    lastAvailablePickup: z.string(),
    categories: z.array(z.string()).nullable()
})

export type Meal = z.infer<typeof MealSchema>

export const MealsPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
    search: z.string()
})

export type MealsPayload = z.infer<typeof MealsPayloadSchema>


export const MealsResponseSchema = z.object({
    items: z.array(
        MealSchema
    ),
    totalCount: z.number(),
    page: z.number()
})

export type MealsResponse = z.infer<typeof MealsResponseSchema>