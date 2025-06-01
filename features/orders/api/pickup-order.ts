import { eatupApi } from "@/lib/api-slice";

const pickup = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    pickupOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/pickup`,
        method: "POST",
      }),
    }),
  }),
});

export const { usePickupOrderMutation } = pickup;
