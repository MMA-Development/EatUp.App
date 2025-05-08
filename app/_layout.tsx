import FontAwesome from '@expo/vector-icons/FontAwesome';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {Provider} from "react-redux";
import {persistor, store} from "@/store";
import {PersistGate} from "redux-persist/integration/react";
import moment from "moment/moment";
import 'moment/locale/da'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(protected)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    moment().locale("da")

    return (
        <GluestackUIProvider mode="system">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <RootLayoutNav/>
                </PersistGate>
            </Provider>
        </GluestackUIProvider>
    )
}

function RootLayoutNav() {

    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false, animation: "none"}}/>
            <Stack.Screen name="(protected)" options={{headerShown: false, animation: "none"}}/>
        </Stack>
    );
}
