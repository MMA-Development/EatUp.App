import {addListener, createListenerMiddleware} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from './types'
import {setupAuthListeners} from "@/features/auth/listeners/auth-listener";

declare type ExtraArgument = object

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch,
    ExtraArgument
>()

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()

// setup listeners
setupAuthListeners()
