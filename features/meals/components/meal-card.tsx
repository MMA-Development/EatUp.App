import {Card} from "@/components/ui/card"
import {Heading} from "@/components/ui/heading"
import {Text} from "@/components/ui/text"
import {Image} from "@/components/ui/image"
import {Pressable, TouchableOpacity, Vibration, View} from "react-native";
import {ArrowRightIcon, Icon} from "@/components/ui/icon";
import {Meal} from "@/features/meals/types";
import moment from "moment";
import * as Haptics from 'expo-haptics';
import {MyButton} from "@/components/ui/my-button";

export default function MealCard() {

    const meal: Meal = {
        "id": "1",
        "vendorId": "ba6c0306-6506-4d92-d2e7-08dd8d31d017",
        "vendorName": "Coop365",
        "title": "Rundstykker",
        "originalPrice": 60,
        "price": 30,
        "description": "Friskbagt rundstykker",
        "quantity": 5,
        "maxOrderQuantity": 1,
        "firstAvailablePickup": "2025-05-07T06:40:26.522",
        "lastAvailablePickup": "2025-05-07T13:40:26.522",
        "categories": null
    }

    const handleHaptics = async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        } catch (error) {
            console.log('Haptics fejl:', error);
        }
    };


    return (
        <TouchableOpacity onPress={handleHaptics}>
            <Card variant="elevated"
                  className="border-[1px] relative w-96 my-2 mx-2 rounded-2xl p-0 border-background-100">
                <Image
                    source={{
                        uri: "https://gluestack.github.io/public-blog-video-assets/mountains.png",
                    }}
                    alt="image"
                    className="w-full h-32 rounded-t-2xl "
                />
                <View className="p-4 flex-col">
                    <Heading size="lg" className="text-primary-900">{meal.vendorName} | Grønnegade 15</Heading>
                    <Text size="md" className="text-primary-700">{meal.title}</Text>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-2">
                            <Text size="lg" className="font-bold text-green-600">{meal.price} kr</Text>
                            <Text size="sm" className="line-through text-gray-400">{meal.originalPrice} kr</Text>
                        </View>
                        <Icon className="text-primary-500" as={ArrowRightIcon}/>
                    </View>

                    <Text size="sm" className="text-gray-600 mt-1">
                        Afhent i
                        dag {moment(meal.firstAvailablePickup).format("LT")} – {moment(meal.lastAvailablePickup).format("LT")}
                    </Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}
