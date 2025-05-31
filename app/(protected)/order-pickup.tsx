import {SafeAreaView, View} from "react-native";
import {Box} from "@/components/ui/box";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
// import { Circle } from "@/components/ui/circle";
import {Image} from "@/components/ui/image";
import SwipeButton from "@/components/ui/swipe-button";

export default function OrderPickupScreen() {
    return (
        <SafeAreaView className={"flex-1 justify-center"}>
            <View>
                <Heading size={"4xl"} className={"self-center text-center"}>Afhentning af Morgenbrød</Heading>
                <SwipeButton onComplete={() => alert("Gennemført")}/>
            </View>
        </SafeAreaView>
    );
}