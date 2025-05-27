import {eatupApi} from '@/lib/api-slice'
import {UpdatePayload, LoginResponse, LoginResponseSchema, SignupPayload} from '../types'
import {authenticate} from "@/features/auth/api/login";

export const signup = eatupApi.injectEndpoints({
        endpoints: (builder) => ({
            signup: builder.mutation<void, SignupPayload>({
                query: (body) => ({
                    url: '/users/signup',
                    method: 'POST',
                    body
                }),
                onQueryStarted: async (credentials, {dispatch, queryFulfilled}) => {
                    try {
                        await queryFulfilled
                        dispatch(
                            authenticate.endpoints.authenticate.initiate({
                                username: credentials.username,
                                password: credentials.password
                            })
                        )
                    } catch {

                    }
                },
            }),
        }),
        overrideExisting: true
    }
)

export const {useSignupMutation} = signup