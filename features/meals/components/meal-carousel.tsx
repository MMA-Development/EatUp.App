import {ScrollView, View} from "react-native";
import {Text} from "@/components/ui/text";
import {Link, LinkText} from "@/components/ui/link";
import MealCard from "@/features/meals/components/meal-card";
import {Meal} from "@/features/meals/types";
import {getBindingIdentifiers} from "@babel/types";
import keys = getBindingIdentifiers.keys;

interface MealCarouselProps {
    title: string,
    meals: Meal[]
}

export default function MealCarousel({title, meals}: MealCarouselProps) {
    return (
        <>
            <View className="flex justify-between flex-row items-center px-4">
                <Text className="font-bold text-xl">{title}</Text>
                <Link href="https://gluestack.io/">
                    <LinkText>Se alle</LinkText>
                </Link>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {meals.map((meal, index) =>
                    <MealCard key={index} meal={meal}/>
                )}
            </ScrollView>
        </>
    )
}