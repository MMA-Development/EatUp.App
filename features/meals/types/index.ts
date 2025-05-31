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
    imageUrl: z.string(),
    firstAvailablePickup: z.string(),
    lastAvailablePickup: z.string(),
    available: z.number(),
    categories: z.array(
        z.object({
            name: z.string(),
            id: z.string(),
        })
    ),
    averageReview: z.number().nullable(),
})

export type Meal = z.infer<typeof MealSchema>

export const MealsPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
    search: z.string().optional(),
    categories: z.array(z.string()).optional(),
    ascending: z.boolean().optional(),
    sortBy: z.string().optional(),
    vendorId: z.string().optional()
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


export const CategoriesResponseSchema = z.object({
    items: z.array(
        z.object({
            name: z.string(),
            id: z.string(),
        })
    ),
    totalCount: z.number(),
    page: z.number()
})

export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>

export const CategoriesPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
})

export type CategoriesPayload = z.infer<typeof CategoriesPayloadSchema>


export const RecommendedMealsPayloadSchema = z.object({
    take: z.number(),
    skip: z.number(),
})

export type RecommendedMealsPayload = z.infer<typeof RecommendedMealsPayloadSchema>