import {Redirect, Stack} from "expo-router";
import {useAppSelector} from "@/store/hooks";

export default function ProtectedLayout() {
    const auth = useAppSelector((state) => state.auth)

    if (!auth.isAuthenticated) {
        return <Redirect href="/login"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
}