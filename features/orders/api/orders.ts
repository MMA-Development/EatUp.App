import {eatupApi} from '@/lib/api-slice'
import {
    OrdersPayload,
    OrdersResponse,
    OrdersResponseSchema,
} from '../types'

export const orders = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<OrdersResponse, OrdersPayload>({
            query: ({take, skip, search}) => `/orders/user?Take=${take}&Skip=${skip}&Search=${search}`,
            extraOptions: {
                dataSchema: OrdersResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useGetOrdersQuery} = orders