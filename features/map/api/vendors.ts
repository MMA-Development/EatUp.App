import {eatupApi} from '@/lib/api-slice'
import {VendorsPayload, VendorsResponse, VendorsResponseSchema} from '../types'

export const vendors = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        vendors: builder.query<VendorsResponse, VendorsPayload>({
            query: ({take, skip, longitude, latitude, radius, search}) => `/Vendors?Take=${take}&Skip=${skip}&Longitude=${longitude}&Latitude=${latitude}&Radius=${radius}&Search=${search}`,
            extraOptions: {
                dataSchema: VendorsResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useVendorsQuery} = vendors