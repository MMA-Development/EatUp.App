import {SafeAreaView, ScrollView, View} from "react-native";
import {Heading} from "@/components/ui/heading";
import MealList from "@/features/meals/components/meal-list";

export default function FavouritesScreen() {
    return (
        <SafeAreaView className="bg-background-0 flex-1 w-full">
            <View className={"px-2"}>
                <Heading className={"px-4 font-bold"} size={"xl"}>Favoritter</Heading>
                <MealList/>
            </View>
        </SafeAreaView>
    );
}