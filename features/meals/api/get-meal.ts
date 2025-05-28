import {eatupApi} from '@/lib/api-slice'
import {Meal, MealSchema} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeal: builder.query<Meal, string>({
            query: (mealId) => `/meals/${mealId}`,
            extraOptions: {
                dataSchema: MealSchema
            },
        })
    }),
})

export const {useGetMealQuery} = meals