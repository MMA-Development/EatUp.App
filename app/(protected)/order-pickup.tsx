import {SafeAreaView, View} from "react-native";
import {Heading} from "@/components/ui/heading";
import SwipeButton from "@/components/ui/swipe-button";
import {usePickupOrderMutation} from "@/features/orders/api/pickup-order";
import {router, useLocalSearchParams} from "expo-router";

export default function OrderPickupScreen() {
    const {orderId, orderTitle} = useLocalSearchParams<{ orderId: string, orderTitle: string }>();
    const [pickupOrder] = usePickupOrderMutation();

    const handlePickup = async () => {
        try {
            const response = await pickupOrder(orderId);
            if (response.error) {
                alert("Fejl ved afhentning");
            } else {
                alert("Afhentning gennemført!");
                router.back();
            }
        } catch (error) {
            console.error("Error during pickup:", error);
            alert("Der opstod en fejl under afhentning. Prøv igen senere.");
        }
    };

    return (
        <SafeAreaView className={"flex-1 justify-center"}>
            <View>
                <Heading size={"4xl"} className={"self-center text-center"}>
                    Afhentning af {orderTitle}
                </Heading>
                <SwipeButton onComplete={() => handlePickup()}/>
            </View>
        </SafeAreaView>
    );
}
