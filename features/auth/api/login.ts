import { eatupApi } from '@/lib/api-slice'
import { LoginPayload, LoginResponse, LoginResponseSchema } from '../types'
import { setToken, setUser } from '../store'

export const authenticate = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.mutation<LoginResponse, LoginPayload>({
            query: (body) => ({
                url: '/users/signin',
                method: 'POST',
                body
            }),
            extraOptions: {
                dataSchema: LoginResponseSchema
            },
            onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(credentials.username))
                    dispatch(setToken(data))
                } catch {
                    dispatch(setUser(null))
                    dispatch(setToken(null))
                }
            }
        })
    })
})

export const { useAuthenticateMutation } = authenticate