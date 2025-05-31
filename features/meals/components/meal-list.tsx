import {SafeAreaView, ScrollView} from "react-native";
import MealCard from "@/features/meals/components/meal-card";
import {Meal} from "@/features/meals/types";
import {Text} from "@/components/ui/text";

interface MealListProps {
    meals: Meal[]
}
export default function MealList({meals}: MealListProps) {
    return (
            <ScrollView className={"w-full"}>
                {meals && meals.map((meal, index) =>
                    <MealCard key={index} meal={meal}/>
                )}
                {!meals.length && (
                    <Text className={"p-4"}>Ingen favoritter</Text>
                )}
            </ScrollView>
    )
}