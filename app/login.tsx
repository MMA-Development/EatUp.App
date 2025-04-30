import {useContext} from "react";
import {AuthContext} from "@/features/auth/contexts/authContext";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {SafeAreaView} from "react-native";
import {Center} from "@/components/ui/center";

export default function LoginScreen() {
    const authContext = useContext(AuthContext);

    return (
        <Center className="bg-emerald-500 flex-1">
            <Button onPress={() => authContext.logIn()}>
                <ButtonText>Login</ButtonText>
            </Button>
        </Center>

    )
}