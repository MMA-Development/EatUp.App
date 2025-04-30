import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQueryWithValidation} from "@/lib/base-query";

export const eatupApi = createApi({
    reducerPath: 'eatUp.api',
    baseQuery: baseQueryWithValidation,
    endpoints: () => ({})
})