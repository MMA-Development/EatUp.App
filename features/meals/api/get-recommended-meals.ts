import {eatupApi} from '@/lib/api-slice'
import {MealsResponse, MealsResponseSchema, RecommendedMealsPayload} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecommendedMeals: builder.query<MealsResponse, RecommendedMealsPayload>({
            query: ({take, skip}) => `/meals/recommended?Take=${take}&Skip=${skip}`,
            extraOptions: {
                dataSchema: MealsResponseSchema
            },
        })
    }),
})

export const {useGetRecommendedMealsQuery} = meals
