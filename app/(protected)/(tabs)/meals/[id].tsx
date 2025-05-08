import {Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {MyButton} from "@/components/ui/my-button";
import {Image} from "@/components/ui/image";
import {Text} from "@/components/ui/text";
import {Heading} from "@/components/ui/heading";
import {ArrowLeftIcon, FavouriteIcon, Icon} from "@/components/ui/icon";
import moment from "moment";
import {router} from 'expo-router';

export default function MealDetailScreen() {
    // Dette skulle selvfølgelig komme fra en API eller state
    const meal = {
        "id": "1",
        "vendorId": "ba6c0306-6506-4d92-d2e7-08dd8d31d017",
        "vendorName": "Coop365",
        "title": "Rundstykker Morgenmad og Aftensmad",
        "originalPrice": 60,
        "price": 30,
        "description": "Friskbagt rundstykker lavet med kærlighed. Vores bagere står tidligt op for at sikre den bedste kvalitet til dig. Perfekt til både morgenmad og aftensmad.",
        "quantity": 5,
        "maxOrderQuantity": 1,
        "firstAvailablePickup": "2025-05-07T06:40:26.522",
        "lastAvailablePickup": "2025-05-07T13:40:26.522",
        "categories": ["Morgenmad", "Aftensmad"]
    };

    return (
        <View className="flex-1 bg-background-0">
            {/* Header Image */}
            <View className="relative h-72">
                <Image
                    className="w-full h-full"
                    source={{
                        uri: "https://f.nordiskemedier.dk/2bqd8imymcjkxk7b_660_368.jpg",
                    }}
                    alt={meal.title}
                />
                <Pressable onPress={() => console.log("favorite")} className="bg-gray-900/50 absolute top-12 right-4 z-10 rounded-full p-2">
                <Icon
                    as={FavouriteIcon}
                    size="xl"
                    className="text-white"
                />
                </Pressable>
                <Pressable onPress={() => router.back()} className="bg-gray-900/50 absolute top-12 left-4 z-10 rounded-full p-2">
                    <Icon
                        as={ArrowLeftIcon}
                        size="xl"
                        className="text-white"
                    />
                </Pressable>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-4 pt-4 bg-background-0 -mt-6 rounded-t-3xl">
                {/* Header Information */}
                <View className="space-y-2">
                    <Heading size="xl" className="text-primary-900">{meal.vendorName}</Heading>
                    <Text size="lg" className="text-primary-700">{meal.title}</Text>

                    {/* Pricing */}
                    <View className="flex-row items-center space-x-2 mt-2 gap-2">
                        <Text size="2xl" className="font-bold text-green-600">{meal.price} kr</Text>
                        <Text size="lg" className="line-through text-gray-400">{meal.originalPrice} kr</Text>
                    </View>

                    {/* Pickup Time */}
                    <View className="bg-background-info p-4 rounded-xl mt-4">
                        <Text size="md" className="font-semibold">Afhentning i dag</Text>
                        <Text size="md" className="text-gray-600">
                            {moment(meal.firstAvailablePickup).format("HH:mm")} - {moment(meal.lastAvailablePickup).format("HH:mm")}
                        </Text>
                    </View>

                    {/* Categories */}
                    <View className="flex-row flex-wrap gap-2 mt-4">
                        {meal.categories.map((category, index) => (
                            <View key={index} className="bg-indicator-info px-3 py-1 rounded-full">
                                <Text size="sm" className="text-primary-900">{category}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Description */}
                    <View className="mt-4">
                        <Text size="md" className="font-semibold mb-2">Beskrivelse</Text>
                        <Text size="md" className="text-gray-600">{meal.description}</Text>
                    </View>

                    {/* Quantity Information */}
                    <View className="bg-amber-100 p-4 rounded-xl mt-4">
                        <Text size="md" className="font-semibold">Antal tilgængelige portioner</Text>
                        <Text size="md" className="text-gray-600">
                            {meal.quantity} stk. (Max {meal.maxOrderQuantity} pr. ordre)
                        </Text>
                    </View>
                </View>

                {/* Padding for button */}
                <View className="h-24"/>
            </ScrollView>

            {/* Reserve Button */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-0">
                <MyButton size="xl" action="positive">
                    Reserver for {meal.price} kr
                </MyButton>
            </View>
        </View>
    );
}