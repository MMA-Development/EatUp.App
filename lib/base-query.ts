import { logout, setToken } from '@/features/auth/store'
import { LoginResponse } from '@/features/auth/types'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from '@/store/types'
import { ZodError, ZodSchema } from 'zod'

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token?.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const baseQueryWithValidation: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    { argumentSchema?: ZodSchema; dataSchema?: ZodSchema },
    FetchBaseQueryMeta
> = async (args, api, extraOptions = {}) => {
    if (extraOptions.argumentSchema) {
        try {
            extraOptions.argumentSchema.parse(args)
        } catch {
            return { error: { status: 400, data: 'Invalid arguments' } }
        }
    }

    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery(
            {
                url: '/users/token',
                method: 'POST',
                body: `"${(api.getState() as RootState).auth.token?.refreshToken}"`
            },
            api,
            extraOptions
        )
        if (refreshResult.data) {
            const token = refreshResult.data as LoginResponse
            // store the new tokens
            api.dispatch(setToken(token))
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    if ('data' in result && extraOptions.dataSchema) {
        try {
            extraOptions.dataSchema.parse(result.data)
        } catch (e) {
            if (e instanceof ZodError) {
                console.error(`[base-query]: threw \n${e}`)
            }
            return { error: { status: 400, data: 'Invalid data' } }
        }
    }

    return result
}