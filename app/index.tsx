import LoginForm from "@/features/auth/components/login-form";
import {Box} from "@/components/ui/box";
import {useAppSelector} from "@/store/hooks";
import {Redirect} from "expo-router";

export default function LoginScreen() {

    const auth = useAppSelector((state) => state.auth)

    if (auth.isAuthenticated) {
        return <Redirect href="/(protected)/(tabs)/meals"/>;
    }

    return (
        <Box className="bg-background-0 flex h-full justify-center items-center">
            <LoginForm />
        </Box>
    )
}