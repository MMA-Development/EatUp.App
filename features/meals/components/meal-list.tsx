import {SafeAreaView, ScrollView} from "react-native";
import MealCard from "@/features/meals/components/meal-card";
import {Meal} from "@/features/meals/types";

export default function MealList() {
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
        "categories": ["Morgenmad", "Aftensmad"]
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
            "categories": ["Slik"]
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
            "categories": ["Vegansk"]
        },
    ]

    return (
            <ScrollView className={"w-full"}>
                {meals.map((meal, index) =>
                    <MealCard key={index} meal={meal}/>
                )}
            </ScrollView>
    )
}