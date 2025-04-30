import {combineReducers} from "redux";
import {eatupApi} from "@/lib/api-slice";
import auth from '@/features/auth/store/index'

export const rootReducer = combineReducers({
    auth: auth,
    [eatupApi.reducerPath]: eatupApi.reducer
})