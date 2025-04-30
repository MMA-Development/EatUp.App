import {rootReducer} from "@/store/root-reducer";
import {store} from "@/store/index";


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store