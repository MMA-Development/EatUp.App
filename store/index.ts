import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "@/store/root-reducer";
import { eatupApi } from '@/lib/api-slice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {encryptTransform} from "redux-persist-transform-encrypt";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
    transforms: [
        encryptTransform({
            secretKey: process.env.EXPO_PUBLIC_ENCRYPT_KEY!,
            onError: function (error) {
                console.error('Encryption error:', error)
            }
        })
    ]
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(eatupApi.middleware)
})

export const persistor = persistStore(store)