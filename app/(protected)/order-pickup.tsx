import { SafeAreaView, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import SwipeButton from "@/components/ui/swipe-button";
import { usePickupOrderMutation } from "@/features/orders/api/pickup-order";
import { useLocalSearchParams } from "expo-router";
import { eatupApi } from "@/lib/api-slice";

export default function OrderPickupScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [pickupOrder] = usePickupOrderMutation();

  const handlePickup = async () => {
    try {
      const response = await pickupOrder(orderId);
      if (response.error) {
        alert("Fejl ved afhentning");
      } else {
        alert("Afhentning gennemført!");
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
          Afhentning af Morgenbrød
        </Heading>
        <SwipeButton onComplete={() => handlePickup()} />
      </View>
    </SafeAreaView>
  );
}
