import {SafeAreaView, View} from "react-native";
import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {VStack} from "@/components/ui/vstack";
import {Input, InputField} from "@/components/ui/input";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";

export default function SettingsScreen() {
    return (
        <Box className={"bg-background-0 rounded-lg p-6 w-full max-w-[400] self-center"}>
            <Heading size="md" className={"mb-2"}>
                Update Profile
            </Heading>
            <Text className={"color-gray-600 mb-4"} size={"sm"}>
                Change your personal details below.
            </Text>

            <VStack className={"gap-4"}>
                <Input>
                    <InputField placeholder={"Username"}/>
                </Input>
                <Input>
                    <InputField placeholder={"Full name"}/>
                </Input>
                <Input>
                    <InputField keyboardType={"email-address"} placeholder={"Email"}/>
                </Input>
                <Input>
                    <InputField secureTextEntry={true} placeholder={"Password"}/>
                </Input>
            </VStack>

            <HStack className={"gap-4 mt-4 justify-end"}>
                <Button action="secondary">
                    <ButtonText>
                        Cancel
                    </ButtonText>
                </Button>
                <Button>
                    <ButtonText>
                        Save
                    </ButtonText>
                </Button>
            </HStack>
        </Box>
    )
}