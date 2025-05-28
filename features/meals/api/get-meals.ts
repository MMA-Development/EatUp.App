import {eatupApi} from '@/lib/api-slice'
import {MealsPayload, MealsResponse, MealsResponseSchema} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeals: builder.query<MealsResponse, MealsPayload>({
            query: ({ take, skip, search, categories }) => {
                const params = new URLSearchParams()

                // Add basic parameters
                if (typeof take === 'number') params.set('Take', String(take))
                if (typeof skip === 'number') params.set('Skip', String(skip))
                if (search?.trim()) params.set('Search', search.trim())

                // Append multiple Categories if provided
                categories?.forEach((cat) => {
                    if (cat?.trim()) params.append('Categories', cat.trim())
                })

                return `/meals?${params.toString()}`
            },
            extraOptions: {
                dataSchema: MealsResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useGetMealsQuery} = meals