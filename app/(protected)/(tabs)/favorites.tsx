import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import {SafeAreaView, ScrollView, View} from "react-native";
import {Heading} from "@/components/ui/heading";
import MealList from "@/features/meals/components/meal-list";
import {useGetFavoriteMealsQuery} from "@/features/meals/api/get-favorite-meals";

export default function FavouritesScreen() {
    const {data, isLoading, refetch: refetchFavorites} = useGetFavoriteMealsQuery({
        take: 10,
        skip: 0,
    })

    useFocusEffect(
      useCallback(() => {
        refetchFavorites();
      }, [])
    );

    return (
        <SafeAreaView className="bg-background-0 flex-1 w-full">
            <View className={"px-2"}>
                <Heading className={"px-4 font-bold"} size={"xl"}>Favoritter</Heading>
                {data && (
                    <MealList meals={data?.items}/>
                )}
            </View>
        </SafeAreaView>
    );
}