import { meals } from '@/features/meals/api/get-meal'
import { eatupApi } from '@/lib/api-slice'
import * as Calendar from 'expo-calendar';
import moment from 'moment'
import {
    PaymentSheetParamsPayload,
    PaymentSheetParamsResponse,
    PaymentSheetParamsResponseSchema
} from '../types'

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
                    const { status } = await Calendar.requestCalendarPermissionsAsync();
                    if (status !== 'granted') {
                        return;
                    }

                    const dueDate = moment().add(30, 'minutes').toDate();

                    await Calendar.createReminderAsync(null, {
                      title: 'Hent dit måltid!',
                      notes: `Du har bestilt et måltid`,
                      dueDate: dueDate,
                      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    });
                } catch {}
            }
        })
    }),
    overrideExisting: true
})

export const {useFetchPaymentSheetParamsMutation} = stripe