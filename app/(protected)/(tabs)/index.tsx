import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";
import {useAppDispatch} from "@/store/hooks";
import {logout} from "@/features/auth/store";

export default function Screen() {
    const dispatch = useAppDispatch();
    return (
        <Box className="bg-background-0 flex h-full justify-center items-center">
            <Text className="">Logged in</Text>
            <Button onPress={() => dispatch(logout())}>
                <ButtonText>
                    Log ud
                </ButtonText>
            </Button>
        </Box>
    );
}