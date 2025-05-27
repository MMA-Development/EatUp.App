import SignupForm from "@/features/auth/components/signup-form";
import {Box} from "@/components/ui/box";
import {Link, useRouter} from "expo-router";
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {Text} from "@/components/ui/text";
import {Image} from "@/components/ui/image";
import LoginForm from "@/features/auth/components/login-form";

export default function SignupScreen() {
    const router = useRouter();
    return (
        <SafeAreaView className="bg-background-0 flex-1">
            <View className="flex-1 justify-center items-center px-4">
                <Image
                    size="xl"
                    className="aspect-[620/208] w-full max-w-[620px]"
                    source={require("../assets/images/logo.png")}
                    alt="image"
                />
                <SignupForm />
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/")}
                className="items-center pb-6"
            >
                <Text className="text-blue-400">Har du allerede en konto, login her!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}