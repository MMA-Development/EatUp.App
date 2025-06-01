import { eatupApi } from "@/lib/api-slice";
import {
  MealsResponse,
  MealsResponseSchema,
  RecommendedMealsPayload,
} from "../types";

export const meals = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteMeals: builder.query<MealsResponse, RecommendedMealsPayload>({
      query: ({ take, skip }) => `/meals/favorites?Take=${take}&Skip=${skip}`,
      extraOptions: {
        dataSchema: MealsResponseSchema,
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetFavoriteMealsQuery } = meals;
