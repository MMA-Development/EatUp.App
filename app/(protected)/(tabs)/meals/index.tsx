import {ActivityIndicator, SafeAreaView, ScrollView, View} from "react-native";
import {MyButton} from "@/components/ui/my-button";
import MealCarousel from "@/features/meals/components/meal-carousel";
import {Meal} from "@/features/meals/types";
import MealCategories from "@/features/meals/components/meal-categories";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";
import {useGetMealsQuery} from "@/features/meals/api/get-meals";

export default function Screen() {

    const {data: lastChanceMeals, isLoading: mealsIsLoading} = useGetMealsQuery({
        skip: 0,
        take: 5,
        search: "",
        categories: [],
        ascending: true,
        sortBy: "lastAvailablePickup",
    }, {
        refetchOnMountOrArgChange: true,
    });


    const meals: Meal[] = [{
        "id": "1",
        "vendorId": "ba6c0306-6506-4d92-d2e7-08dd8d31d017",
        "vendorName": "Coop365",
        "title": "Rundstykker Morgenmad og Afstensmad",
        "originalPrice": 60,
        "price": 30,
        "description": "Friskbagt rundstykker",
        "quantity": 5,
        "maxOrderQuantity": 1,
        "firstAvailablePickup": "2025-05-07T06:40:26.522",
        "lastAvailablePickup": "2025-05-07T13:40:26.522",
        "available": 5,
        "categories": [
            {
                "name": "Morgenmad",
                "meals": [],
                "id": "3fa4cbc1-40c6-4a0f-1e2d-08dd9daf9e40",
                "deletedAt": null,
                "createdAt": "2025-05-28T06:19:35.7121841",
                "updatedAt": "2025-05-28T08:15:07.803538"
            }
        ]
    },
        {
            "id": "1",
            "vendorId": "ba6c0306-6506-4d92-d2e7-08dd8d31d017",
            "vendorName": "Coop365",
            "title": "Rundstykker Slik",
            "originalPrice": 60,
            "price": 30,
            "description": "Friskbagt rundstykker",
            "quantity": 5,
            "maxOrderQuantity": 1,
            "firstAvailablePickup": "2025-05-07T06:40:26.522",
            "lastAvailablePickup": "2025-05-07T13:40:26.522",
            "available": 5,
            "categories": [
                {
                    "name": "Morgenmad",
                    "meals": [],
                    "id": "3fa4cbc1-40c6-4a0f-1e2d-08dd9daf9e40",
                    "deletedAt": null,
                    "createdAt": "2025-05-28T06:19:35.7121841",
                    "updatedAt": "2025-05-28T08:15:07.803538"
                }
            ]
        },
        {
            "id": "1",
            "vendorId": "ba6c0306-6506-4d92-d2e7-08dd8d31d017",
            "vendorName": "Coop365",
            "title": "Rundstykker Vegansk",
            "originalPrice": 60,
            "price": 30,
            "description": "Friskbagt rundstykker",
            "quantity": 5,
            "maxOrderQuantity": 1,
            "firstAvailablePickup": "2025-05-07T06:40:26.522",
            "lastAvailablePickup": "2025-05-07T13:40:26.522",
            "available": 5,
            "categories": [
                {
                    "name": "Morgenmad",
                    "meals": [],
                    "id": "3fa4cbc1-40c6-4a0f-1e2d-08dd9daf9e40",
                    "deletedAt": null,
                    "createdAt": "2025-05-28T06:19:35.7121841",
                    "updatedAt": "2025-05-28T08:15:07.803538"
                }
            ]
        },
    ]


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
                        <MealCarousel title={"Favoritter"} meals={meals}/>
                        <MealCarousel title={"Anbefalinger"} meals={meals}/>
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
