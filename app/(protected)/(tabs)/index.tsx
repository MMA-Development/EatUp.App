import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";
import {useContext} from "react";
import {AuthContext} from "@/features/auth/contexts/authContext";

export default function Screen() {
    // const authContext = useContext(AuthContext);
    return (
        <Box className="bg-primary-500 p-5 flex-1">
            <Text className="text-typography-0">Logged in</Text>
            {/*<Button onPress={() => authContext.logOut()}>*/}
            {/*    <ButtonText>Logud</ButtonText>*/}
            {/*</Button>*/}
        </Box>
    );
}