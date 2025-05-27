import {combineReducers} from "redux";
import {eatupApi} from "@/lib/api-slice";
import auth from '@/features/auth/store/index'
import location from '@/features/map/store/index'

export const rootReducer = combineReducers({
    auth: auth,
    location: location,
    [eatupApi.reducerPath]: eatupApi.reducer,
})