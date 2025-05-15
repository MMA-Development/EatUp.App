import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import ProfileForm from "@/features/user/components/profile-form";

export default function SettingsScreen() {
    return (
        <Box className={"flex-1 bg-background-0 rounded-lg p-6 w-full max-w-[400] self-center"}>
            <Heading size="lg" className={"mb-2"}>
                Opdater Profil
            </Heading>
            <Text className={"color-gray-600 mb-4"} size={"sm"}>
                Ændre dine personlige detaljer herunder.
            </Text>
            <ProfileForm/>
        </Box>
    )
}