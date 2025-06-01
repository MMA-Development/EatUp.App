import {eatupApi} from '@/lib/api-slice'
import {MealsPayload, MealsResponse, MealsResponseSchema} from '../types'

export const meals = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeals: builder.query<MealsResponse, MealsPayload>({
            query: ({ take, skip, search, categories , ascending, sortBy, vendorId}) => {
                const params = new URLSearchParams()

                // Add basic parameters
                if (typeof take === 'number') params.set('Take', String(take))
                if (typeof skip === 'number') params.set('Skip', String(skip))
                if (typeof ascending === 'boolean') params.set('Ascending', String(ascending))
                if (typeof sortBy === 'string') params.set('SortBy', sortBy)
                if (typeof vendorId === 'string') params.set('VendorId', vendorId)
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