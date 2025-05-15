import {Redirect, Stack} from "expo-router";
import {useAppSelector} from "@/store/hooks";
import {persistor} from "@/store";
import {useColorScheme} from "react-native";

export default function ProtectedLayout() {
    const auth = useAppSelector((state) => state.auth)
    const colorScheme = useColorScheme();

    if (!auth.isAuthenticated) {
        return <Redirect href="/"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{presentation: "modal", navigationBarHidden: true, animation: "slide_from_bottom", title: "Indstillinger", headerStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#171717' : '#ffffff',
                },
                contentStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#171717' : '#ffffff',
                },
                headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
            }}/>
        </Stack>
    )
}