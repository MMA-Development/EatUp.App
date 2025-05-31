import {eatupApi} from '@/lib/api-slice'
import {Meal, MealSchema, MealsPayload, MealsResponse, MealsResponseSchema} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getVendorMeals: builder.query<MealsResponse, MealsPayload>({
            query: ({take, skip, vendorId}) => `/meals?Take=${take}&Skip=${skip}&vendorId=${vendorId}`,
            extraOptions: {
                dataSchema: MealsResponseSchema
            },
        })
    }),
})

export const {useGetVendorMealsQuery} = meals