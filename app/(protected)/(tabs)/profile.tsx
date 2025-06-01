import { HStack } from '@/components/ui/hstack';
import {
    CalendarDaysIcon,
    GlobeIcon,
    Icon,
    SettingsIcon
} from '@/components/ui/icon';
import { MyButton } from '@/components/ui/my-button';
import { Text } from '@/components/ui/text';
import { useGetMeQuery } from '@/features/auth/api/me';
import { logout, selectStripeUserId } from '@/features/auth/store';
import { OrdersList } from '@/features/orders/components/orders-list';
import { useGetStatsQuery } from '@/features/user/api/get-stats'
import { BadgeCard } from '@/features/user/components/badge-card'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';
import { Banknote, PiggyBank, Trees } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const stripe = useAppSelector(selectStripeUserId);
    const {resetPaymentSheetCustomer} = useStripe()
    const {data} = useGetMeQuery();
    const { data: stats } = useGetStatsQuery()

    const badges = useMemo(() => {
        if (!stats) return [];

        return [
            {
                id: 1,
                icon: Trees,
                title: 'CO2 Beginner',
                description: 'Undgået 1 kg CO2',
                achieved: stats.cO2Saved >= 1,
            },
            {
                id: 2,
                icon: GlobeIcon,
                title: 'CO2 Mester',
                description: 'Undgået 10 kg CO2',
                achieved: stats.cO2Saved >= 10,
            },
            {
                id: 3,
                icon: PiggyBank,
                title: 'Sparegris',
                description: 'Sparet 50 kr',
                achieved: stats.moneySaved >= 50,
            },
            {
                id: 4,
                icon: Banknote,
                title: 'Rigmand',
                description: 'Sparet 500 kr',
                achieved: stats.moneySaved >= 500,
            },
        ];
    }, [stats]);

    if(!stats) return null

    return (
        <SafeAreaView className="bg-background-0 flex-1">
            {/* Top bar */}
            <View className="bg-background-0 px-6 py-6 border-b border-gray-200">
                <HStack className="justify-between items-center">
                    <Text className="text-2xl font-semibold">{data?.fullName}</Text>
                    <Pressable onPress={() => router.push("/settings")}>
                        <Icon as={SettingsIcon} size={"xl"}/>
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
                                <Icon as={GlobeIcon} size={"xl"} color={"green"}/>
                            </View>
                            <Text className="text-sm text-gray-600">CO2 Undgået</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-3xl font-semibold text-green-600">
                                {stats.cO2Saved}
                            </Text>
                            <Text className="text-sm ml-2 text-green-600">kg</Text>
                        </HStack>
                    </View>

                    {/* Money Saved Card */}
                    <View className="flex-1 bg-blue-50 rounded-3xl p-6">
                        <HStack className="items-center mb-4">
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                                <Icon as={CalendarDaysIcon} size={"xl"} color={"blue"}/>
                            </View>
                            <Text className="text-sm text-gray-600">Penge Sparet</Text>
                        </HStack>
                        <HStack className="items-baseline">
                            <Text className="text-3xl font-semibold text-blue-600">
                                {stats.moneySaved}
                            </Text>
                            <Text className="text-sm ml-2 text-blue-600">kr</Text>
                        </HStack>
                    </View>
                </View>

                <Text className="text-xl font-semibold mb-4 px-4">
                    Dine badges
                </Text>

                <View className="flex-row flex-wrap justify-between mx-4 gap-2">
                    {badges.map((badge, index) => (
                      <BadgeCard
                        key={index}
                        title={badge.title}
                        description={badge.description}
                        achieved={badge.achieved}
                        icon={badge.icon}
                      />
                    ))}
                </View>

                {/* Previous Orders Section */}
                <OrdersList/>

                {/* Logout Button */}
                <MyButton
                    onPress={async () => {
                        await resetPaymentSheetCustomer()
                        dispatch(logout())
                    }}
                    className="mt-8"
                >
                    Logout
                </MyButton>

                {/* Stripe User Info */}
                <Text className="mt-4 text-center text-gray-500">{stripe}</Text>
            </ScrollView>
        </SafeAreaView>
    )
        ;
}
