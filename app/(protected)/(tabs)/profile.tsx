import { Text } from "@/components/ui/text";
import { SafeAreaView, View, ScrollView, Pressable } from "react-native";
import { CalendarDaysIcon, GlobeIcon, Icon, SettingsIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectStripeUserId } from "@/features/auth/store";
import { MyButton } from "@/components/ui/my-button";
import { useGetMeQuery } from "@/features/auth/api/me";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const stripe = useAppSelector(selectStripeUserId);
    const { data } = useGetMeQuery();

    const userData = {
        name: "Andreas Hansen",
        co2Saved: 125.5,
        moneySaved: 750,
        previousOrders: [
            {
                id: 1,
                date: "15. marts 2024",
                meal: "Brød",
                co2Saved: 2.3,
                price: 89,
            },
            {
                id: 2,
                date: "12. marts 2024",
                meal: "Grøntsager",
                co2Saved: 3.1,
                price: 95,
            },
        ],
    };

    return (
        <SafeAreaView className="bg-background-0 flex-1">
            {/* Top bar */}
            <View className="bg-background-0 px-6 py-6 border-b border-gray-200">
                <HStack className="justify-between items-center">
                    <Text className="text-2xl font-semibold">{data?.fullName}</Text>
                    <Pressable onPress={() => router.push("/settings")}>
                        <Icon as={SettingsIcon} size={"xl"} />
                    </Pressable>
                </HStack>
            </View>

            <ScrollView className="flex-1 px-6 py-6">
                {/* Statistic Cards */}
                <View className="flex-row gap-6 mb-8">
                    {/* CO2 Savings Card */}
                    <View className="flex-1 bg-green-50 rounded-3xl p-6">
                        <HStack className="items-center mb-4">
                            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                                <Icon as={GlobeIcon} size={"xl"} color={"green"} />
                            </View>
                            <Text className="text-sm text-gray-600">CO2 Undgået</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-3xl font-semibold text-green-600">
                                {userData.co2Saved}
                            </Text>
                            <Text className="text-sm ml-2 text-green-600">kg</Text>
                        </HStack>
                    </View>

                    {/* Money Saved Card */}
                    <View className="flex-1 bg-blue-50 rounded-3xl p-6">
                        <HStack className="items-center mb-4">
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                                <Icon as={CalendarDaysIcon} size={"xl"} color={"blue"} />
                            </View>
                            <Text className="text-sm text-gray-600">Penge Sparet</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-3xl font-semibold text-blue-600">
                                {userData.moneySaved}
                            </Text>
                            <Text className="text-sm ml-2 text-blue-600">kr</Text>
                        </HStack>
                    </View>
                </View>

                {/* Previous Orders Section */}
                <View>
                    <Text className="text-xl font-semibold mb-6">Tidligere Bestillinger</Text>
                    <VStack space={"lg"}>
                        {userData.previousOrders.map((order) => (
                            <View
                                key={order.id}
                                className="bg-background-0 rounded-2xl p-5 border border-background-100"
                            >
                                <HStack className="justify-between">
                                    <VStack>
                                        <Text className="text-sm text-gray-500">{order.date}</Text>
                                        <Text className="text-lg font-medium mt-2">{order.meal}</Text>
                                    </VStack>
                                    <VStack className="items-end">
                                        <Text className="text-green-600 text-sm">
                                            -{order.co2Saved} kg CO2
                                        </Text>
                                        <Text className="text-gray-600 mt-2">{order.price} kr</Text>
                                    </VStack>
                                </HStack>
                            </View>
                        ))}
                    </VStack>
                </View>

                {/* Logout Button */}
                <MyButton onPress={() => dispatch(logout())} className="mt-8">
                    Logout
                </MyButton>

                {/* Stripe User Info */}
                <Text className="mt-4 text-center text-gray-500">{stripe}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
