import {eatupApi} from '@/lib/api-slice'
import {CategoriesPayload, CategoriesResponse, CategoriesResponseSchema} from '../types'

export const categories = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, CategoriesPayload>({
            query: ({take, skip}) => `/meals/categories?Take=${take}&Skip=${skip}`,
            extraOptions: {
                dataSchema: CategoriesResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useGetCategoriesQuery} = categories