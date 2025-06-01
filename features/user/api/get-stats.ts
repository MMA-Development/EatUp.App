import { eatupApi } from '@/lib/api-slice'

export const stats = eatupApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<{
      cO2Saved: number,
      moneySaved: number
    }, void>({
      query: () => `/users/stats`
    })
  }),
  overrideExisting: true
})

export const { useGetStatsQuery } = stats