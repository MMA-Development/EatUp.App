import {SafeAreaView, ScrollView, View} from "react-native";
import {MyButton} from "@/components/ui/my-button";
import MealCarousel from "@/features/meals/components/meal-carousel";
import {Meal} from "@/features/meals/types";
import MealCategories from "@/features/meals/components/meal-categories";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";

export default function Screen() {

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
                {/*Category Buttons*/}
                {/*<MealCategories/>*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                >
                    {/* Carousels */}
                    <View className="px-4 gap-2">
                        <MealCarousel title={"Anbefalinger"} meals={meals}/>
                        <MealCarousel title={"Favoritter"} meals={meals}/>
                        <MealCarousel title={"Sidste Chance"} meals={meals}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}
