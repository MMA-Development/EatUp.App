import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, View} from "react-native";
import MealCarousel from "@/features/meals/components/meal-carousel";
import {Meal} from "@/features/meals/types";
import {useGetMealsQuery} from "@/features/meals/api/get-meals";
import {useGetRecommendedMealsQuery} from "@/features/meals/api/get-recommended-meals";


export default function Screen() {

    const {data: lastChanceMeals, isLoading: mealsIsLoading, refetch: refetchMeals} = useGetMealsQuery({
        skip: 0,
        take: 5,
        search: "",
        categories: [],
        ascending: true,
        sortBy: "lastAvailablePickup",
    }, {
        refetchOnMountOrArgChange: true,
    });


    const {data: recommendedMeals, isLoading: recommendedMealsIsLoading, refetch: refetchRecommendedMeals} = useGetRecommendedMealsQuery({
        skip: 0,
        take: 5,
    }, {
        refetchOnMountOrArgChange: true,
    })

    useFocusEffect(
      useCallback(() => {
          refetchMeals();
          refetchRecommendedMeals()
      }, [])
    );

    return (
        <View className={"bg-background-0 flex-1"}>
            <SafeAreaView className=" max-h-full">
                {/*<MealCategories/>*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                >
                    {/* Carousels */}
                    <View className="px-4 gap-2">
                        {/*<MealCarousel title={"Favoritter"} meals={meals}/>*/}
                        {recommendedMealsIsLoading && (
                            <View className="flex flex-col items-center">
                                <ActivityIndicator size="large" className="mt-4"/>
                            </View>
                        )
                        }
                        {recommendedMeals &&
                            (
                                <MealCarousel title={"Anbefalinger"} meals={recommendedMeals!.items}/>
                            )
                        }

                        {mealsIsLoading && (
                            <View className="flex flex-col items-center">
                                <ActivityIndicator size="large" className="mt-4"/>
                            </View>
                        )
                        }
                        {lastChanceMeals &&
                            (
                                <MealCarousel title={"Sidste Chance"} meals={lastChanceMeals!.items}/>
                            )
                        }

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}
