import {Redirect, Stack} from "expo-router";
import {AuthContext} from "@/features/auth/contexts/authContext";
import {useContext} from "react";


export default function ProtectedLayout() {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticated) {
        return <Redirect href="/login"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
}