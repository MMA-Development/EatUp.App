import SignupForm from "@/features/auth/components/signup-form";
import {Box} from "@/components/ui/box";
import {Link, useRouter} from "expo-router";
import {ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Text} from "@/components/ui/text";
import {Image} from "@/components/ui/image";
import LoginForm from "@/features/auth/components/login-form";
import {HStack} from "@/components/ui/hstack";

export default function SignupScreen() {
    const router = useRouter();
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
                <View className="flex-1 bg-black/10"/>
            </ImageBackground>

            {/* Content overlays image */}
            <View className="flex-1 justify-end">
                <View className="bg-background-0 rounded-t-3xl px-6 pt-12 pb-10 w-full">
                    <Text className="text-2xl font-bold ml-8 mb-6">Opret dig</Text>

                    <View className="items-center">
                        <SignupForm/>

                        <HStack className="justify-center mt-10">
                            <Text className="font-semibold text-lg">Har du allerede en konto?</Text>
                            <TouchableOpacity onPress={() => router.replace("/")}>
                                <Text className="text-blue-500 text-lg font-semibold"> Login</Text>
                            </TouchableOpacity>
                        </HStack>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}