import {SafeAreaView, ScrollView, View} from "react-native";
import {Heading} from "@/components/ui/heading";
import MealList from "@/features/meals/components/meal-list";

export default function FavouritesScreen() {
    return (
        <SafeAreaView className="bg-background-0 flex-1 w-full">
            <Heading className={"px-6"} size={"3xl"}>Favoritter</Heading>
            <MealList/>
        </SafeAreaView>
    );
}