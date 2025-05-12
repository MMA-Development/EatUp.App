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
        })
    })
})

export const {useFetchPaymentSheetParamsMutation} = stripe