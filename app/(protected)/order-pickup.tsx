import {SafeAreaView} from "react-native";
import {Text} from "@/components/ui/text";
import SwipeButton from "@/components/ui/swipe-button";

export default function OrderPickupScreen() {
    return (
        <SafeAreaView>
            <Text>Pickup</Text>
            <SwipeButton/>
        </SafeAreaView>
    )
}