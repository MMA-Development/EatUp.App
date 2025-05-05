import {Center} from "@/components/ui/center";
import LoginForm from "@/features/auth/components/login-form";
import {Box} from "@/components/ui/box";

export default function LoginScreen() {

    return (
        <Box className="bg-background-0 flex h-full justify-center items-center">
            <LoginForm />
        </Box>
    )
}