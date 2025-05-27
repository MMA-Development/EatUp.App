import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "@/store/types";

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    permissionStatus: 'granted' | 'denied' | 'undetermined';
    error: string | null;
}

const initialState: LocationState = {
    latitude: null,
    longitude: null,
    permissionStatus: 'undetermined',
    error: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        setPermissionStatus: (state, action: PayloadAction<'granted' | 'denied' | 'undetermined'>) => {
            state.permissionStatus = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setPermissionStatus, setError } = locationSlice.actions;
export const selectLocation = (state: RootState) => state.location
export default locationSlice.reducer;