import { eatupApi } from "@/lib/api-slice";
import { OrdersPayload, OrdersResponse, OrdersResponseSchema } from "../types";

export const ordersApi = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, OrdersPayload>({
      query: ({ skip, take, search }) => ({
        url: "/orders/user",
        method: "GET",
        params: { skip, take, search },
      }),
      extraOptions: {
        dataSchema: OrdersResponseSchema,
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems): any => {
        if (currentCache && newItems) {
          const cacheMap = currentCache.items.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as Record<string, any>);

          const newMap = newItems.items.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as Record<string, any>);

          var mergedItems = Object.values({ ...cacheMap, ...newMap });

          return {
            totalCount: newItems.totalCount,
            items: mergedItems,
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
