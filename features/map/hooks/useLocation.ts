// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { AppState } from 'react-native';

export type LocationPermissionStatus = 'granted' | 'denied' | 'undetermined';

export function useLocation() {
    const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('undetermined');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const getPermissionsAndLocation = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        setPermissionStatus(status as LocationPermissionStatus);

        if (status === 'granted') {
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        } else {
            setLocation(null);
        }
    };

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status as LocationPermissionStatus);

        if (status === 'granted') {
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        } else {
            setLocation(null);
        }

        return status;
    };

    useEffect(() => {
        void getPermissionsAndLocation();

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                void getPermissionsAndLocation();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return {
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        permissionStatus,
        requestLocationPermission,
        checkPermission: getPermissionsAndLocation,
    };
}
