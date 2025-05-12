import {eatupApi} from '@/lib/api-slice'
import {LoginPayload, LoginResponse, LoginResponseSchema} from '../types'

export const authenticate = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.mutation<LoginResponse, LoginPayload>({
            query: (body) => ({
                url: '/users/signin',
                method: 'POST',
                body
            })
        })
    }),
    overrideExisting: true
})

export const {useAuthenticateMutation} = authenticate