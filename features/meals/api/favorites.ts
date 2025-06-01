import { eatupApi } from '@/lib/api-slice';
import { meals } from './get-favorite-meals';

export const favorites = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    favorites: builder.mutation<void, string>({
      query: (body) => ({
        url: '/users/favorites',
        method: 'POST',
        body: JSON.stringify(body)
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(meals.endpoints.getFavoriteMeals.initiate({
            skip: 0,
            take: 10
          }, { forceRefetch: true }))
        } catch {
        }
      }
    }),
    deleteFavorite: builder.mutation<void, string>({
      query: (body) => ({
        url: `/users/favorites`,
        method: 'DELETE',
        body: JSON.stringify(body)
      }),
      onQueryStarted: async (favoriteId, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          meals.util.updateQueryData('getFavoriteMeals',
            { skip: 0, take: 10 },
            (draft) => {
              draft.items = draft.items.filter((meal) => meal.id !== favoriteId)
            })
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      }
    })
  }),
  overrideExisting: true
});

export const { useFavoritesMutation, useDeleteFavoriteMutation } = favorites;
