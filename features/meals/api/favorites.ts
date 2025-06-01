import { eatupApi } from "@/lib/api-slice";
import { meals } from "./get-favorite-meals";

export const favorites = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    favorites: builder.mutation<void, string>({
      query: (body) => ({
        url: "/users/favorites",
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    deleteFavorite: builder.mutation<void, string>({
      query: (body) => ({
        url: `/users/favorites`,
        method: "DELETE",
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const { useFavoritesMutation, useDeleteFavoriteMutation } = favorites;
