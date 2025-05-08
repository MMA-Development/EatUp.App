import { Text } from "@/components/ui/text";
import { SafeAreaView, View, ScrollView } from "react-native";
import {CalendarDaysIcon, GlobeIcon, Icon, SettingsIcon} from "@/components/ui/icon";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";

export default function ProfileScreen() {
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
                price: 89
            },
            {
                id: 2,
                date: "12. marts 2024",
                meal: "Grøntsager",
                co2Saved: 3.1,
                price: 95
            },
        ]
    };

    return (
        <SafeAreaView className="bg-background-0 flex-1">
            {/* Top bar med brugerens navn og dekorative elementer */}
            <View className="bg-background-0 px-4 py-6 border-b border-gray-200">
                <HStack className="justify-between items-center px-2">
                    <Text className="text-2xl font-bold">{userData.name}</Text>
                    <Icon as={SettingsIcon} size={"xl"}/>
                </HStack>
            </View>

            <ScrollView className="flex-1">
                {/* Statistik kort sektion */}
                <View className="flex-row p-4 gap-4">
                    {/* CO2 besparelse kort */}
                    <View className="flex-1 bg-green-50 rounded-xl p-4">
                        <HStack className="items-center mb-2">
                            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-2">
                                <Icon as={GlobeIcon} size={"xl"} color={"green"}/>
                            </View>
                            <Text className="text-sm text-gray-600">CO2 Undgået</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-2xl font-bold text-green-600">
                                {userData.co2Saved}
                            </Text>
                            <Text className="text-sm ml-1 text-green-600">kg</Text>
                        </HStack>
                    </View>

                    {/* Penge sparet kort */}
                    <View className="flex-1 bg-blue-50 rounded-xl p-4">
                        <HStack className="items-center mb-2">
                            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
                                <Icon as={CalendarDaysIcon} size={"xl"} color={"blue"}/>
                            </View>
                            <Text className="text-sm text-gray-600">Penge Sparet</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-2xl font-bold text-blue-600">
                                {userData.moneySaved}
                            </Text>
                            <Text className="text-sm ml-1 text-blue-600">kr</Text>
                        </HStack>
                    </View>
                </View>

                {/* Tidligere bestillinger sektion */}
                <View className="px-4 py-6">
                    <Text className="text-xl font-bold mb-4">Tidligere Bestillinger</Text>
                    <VStack space={"md"}>
                        {userData.previousOrders.map((order) => (
                            <View key={order.id} className="bg-background-0 rounded-xl p-4 border border-background-100 shadow-sm">
                                <HStack className="justify-between items-start">
                                    <VStack>
                                        <Text className="text-gray-400 text-sm">{order.date}</Text>
                                            <Text className="text-base mt-1">
                                                {order.meal}
                                            </Text>
                                    </VStack>
                                    <VStack className="items-end">
                                        <Text className="text-green-600 text-sm">
                                            -{order.co2Saved} kg CO2
                                        </Text>
                                        <Text className="text-gray-600 mt-1">
                                            {order.price} kr
                                        </Text>
                                    </VStack>
                                </HStack>
                            </View>
                        ))}
                    </VStack>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}