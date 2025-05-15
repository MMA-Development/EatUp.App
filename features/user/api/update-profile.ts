import {eatupApi} from '@/lib/api-slice'
import {UpdatePayload} from '../types'
import {me} from "@/features/auth/api/me";

export const updateProfile = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        updateMe: builder.mutation<void, UpdatePayload>({
            query: (body) => ({
                url: '/users/me',
                method: 'PUT',
                body
            }),
            async onQueryStarted(user, {dispatch, queryFulfilled}) {
                const patch = dispatch(
                    me.util.updateQueryData('getMe', undefined, (draft) => {
                        Object.assign(draft, user)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patch.undo()
                }
            }
        })
    }),
    overrideExisting: true
})

export const {useUpdateMeMutation} = updateProfile