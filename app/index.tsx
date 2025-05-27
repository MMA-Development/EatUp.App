import LoginForm from "@/features/auth/components/login-form";
import {useAppSelector} from "@/store/hooks";
import {Redirect, useRouter} from "expo-router";
import {ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity, View} from "react-native";
import {Text} from "@/components/ui/text";
import {HStack} from "@/components/ui/hstack";

export default function LoginScreen() {
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth)

    if (auth.isAuthenticated) {
        return <Redirect href="/(protected)/(tabs)/meals"/>;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            {/* Background image */}
            <ImageBackground
                source={require("../assets/images/bg.jpg")}
                resizeMode="cover"
                className="w-full h-[500px] absolute top-0 left-0 right-0"
            >
                <View className="flex-1 bg-black/10" />
            </ImageBackground>

            {/* Content overlays image */}
            <View className="flex-1 justify-end">
                <View className="bg-white rounded-t-3xl px-6 pt-12 pb-10 w-full">
                    <Text className="text-2xl font-bold ml-8 mb-6">Log ind</Text>

                    <View className="items-center">
                        <LoginForm />

                        <HStack className="justify-center mt-10">
                            <Text className="font-semibold text-lg">Har du ikke en konto?</Text>
                            <TouchableOpacity onPress={() => router.replace("/signup")}>
                                <Text className="text-blue-500 text-lg font-semibold"> Opret dig</Text>
                            </TouchableOpacity>
                        </HStack>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}