import {Redirect, Stack} from "expo-router";
import {useAppSelector} from "@/store/hooks";
import {persistor} from "@/store";

export default function ProtectedLayout() {
    const auth = useAppSelector((state) => state.auth)

    if (!auth.isAuthenticated) {
        return <Redirect href="/"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{presentation: "modal", navigationBarHidden: true, animation: "slide_from_bottom", title: "Indstillinger"}}/>
        </Stack>
    )
}