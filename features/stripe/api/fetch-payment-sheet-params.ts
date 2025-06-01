import { meals } from '@/features/meals/api/get-meal'
import {eatupApi} from '@/lib/api-slice'
import {PaymentSheetParamsPayload, PaymentSheetParamsResponse, PaymentSheetParamsResponseSchema} from '../types'

export const stripe = eatupApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPaymentSheetParams: builder.mutation<PaymentSheetParamsResponse, PaymentSheetParamsPayload>({
            query: (body) => ({
                url: '/orders/request',
                method: 'POST',
                body
            }),
            extraOptions: {
                dataSchema: PaymentSheetParamsResponseSchema
            },
            onQueryStarted: async ({ foodPackageId, quantity }, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled
                    dispatch(
                      meals.util.updateQueryData('getMeal', foodPackageId, (draft) => {
                          draft.available = draft.available - quantity
                      })
                    )
                } catch {}
            }
        })
    })
})

export const {useFetchPaymentSheetParamsMutation} = stripe