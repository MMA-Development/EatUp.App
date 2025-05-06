import { Text } from "@/components/ui/text";
import { useAppDispatch } from "@/store/hooks";
import MealCard from "@/features/meals/components/meal-card";
import { SafeAreaView, ScrollView, View } from "react-native";
import { MyButton } from "@/components/ui/my-button";
import { Link, LinkText } from "@/components/ui/link";

export default function Screen() {
    const dispatch = useAppDispatch();
    return (
        <View className="bg-background-0 flex-1">
            <SafeAreaView className="bg-background-0 flex-1">
                {/* Category Buttons */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="py-8"
                >
                    <View className="px-4 gap-2 flex-row">
                        <MyButton className="bg-emerald-500">Alt</MyButton>
                        <MyButton variant="outline">Morgenmad</MyButton>
                        <MyButton variant="outline">Aftensmad</MyButton>
                        <MyButton variant="outline">Slik</MyButton>
                        <MyButton variant="outline">Vegetar</MyButton>
                        <MyButton variant="outline">Vegansk</MyButton>
                    </View>
                </ScrollView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEventThrottle={32}>
                    {/* Recommended Meals */}
                    <View className="flex justify-between flex-row items-center px-4">
                        <Text className="font-bold text-xl">Anbefalet</Text>
                        <Link href="https://gluestack.io/">
                            <LinkText>Se alle</LinkText>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                    </ScrollView>

                    {/* Last Chance Meals */}
                    <View className="flex justify-between flex-row items-center px-4 pt-4">
                        <Text className="font-bold text-xl">Sidste Chance</Text>
                        <Link href="https://gluestack.io/">
                            <LinkText>Se alle</LinkText>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                    </ScrollView>

                    {/* Another Last Chance Meals */}
                    <View className="flex justify-between flex-row items-center px-4 pt-4">
                        <Text className="font-bold text-xl">Sidste Chance</Text>
                        <Link href="https://gluestack.io/">
                            <LinkText>Se alle</LinkText>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                        <MealCard />
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
