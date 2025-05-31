import {eatupApi} from '@/lib/api-slice'

export const meals = eatupApi.injectEndpoints({
        endpoints: (builder) => ({
            favorites: builder.mutation<void, string>({
                query: (body) => ({
                    url: '/users/favorites',
                    method: 'POST',
                    body
                }),
            }),
            deleteFavorite: builder.mutation<void, string>({
                query: (body) => ({
                    url: `/users/favorites`,
                    method: 'DELETE',
                    body
                }),
            }),

        }),
    }
)

export const {useFavoritesMutation, useDeleteFavoriteMutation} = meals