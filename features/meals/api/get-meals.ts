import {eatupApi} from '@/lib/api-slice'
import {MealsPayload, MealsResponse, MealsResponseSchema} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeals: builder.query<MealsResponse, MealsPayload>({
            query: ({take, skip, search}) => `/meals?Take=${take}&Skip=${skip}&Search=${search}`,
            extraOptions: {
                dataSchema: MealsResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useGetMealsQuery} = meals