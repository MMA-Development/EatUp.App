import {eatupApi} from '@/lib/api-slice'
import {MeResponse, MeResponseSchema} from '../types'

export const me = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<MeResponse, void>({
            query: () => '/users/me',
            extraOptions: {
                dataSchema: MeResponseSchema
            },
        })
    }),
    overrideExisting: true
})

export const {useGetMeQuery} = me