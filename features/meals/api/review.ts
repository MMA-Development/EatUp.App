import { eatupApi } from '@/lib/api-slice';
import { meals } from './get-favorite-meals';

export const review = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation<void, { mealId: string, rating: number, description: string }>({
            query: ({mealId, rating, description}) => ({
                url: `/meals/${mealId}/review`,
                method: 'POST',
                body: {rating, description}
            }),
            // onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
            //     try {
            //         await queryFulfilled
            //         dispatch(meals.endpoints.getFavoriteMeals.initiate({
            //             skip: 0,
            //             take: 10
            //         }, { forceRefetch: true }))
            //     } catch {
            //     }
            // }
        }),
    }),
    overrideExisting: true
});

export const { useAddReviewMutation } = review;
