import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Center} from "@/components/ui/center";

export default function LoginScreen() {

    return (
        <Center className="bg-emerald-500 flex-1">
            <Button>
                <ButtonText>Login</ButtonText>
            </Button>
        </Center>

    )
}