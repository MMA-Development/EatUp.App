import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {useGetOrdersQuery} from "@/features/orders/api/orders";

export function OrdersList() {
    const {data, isLoading} = useGetOrdersQuery({skip: 0, take: 10, search: ""})

    if (!data) return <Text>Ingen tidligere bestillinger</Text>;
    if (isLoading) return <Text>Indlæser tidligere bestillinger...</Text>;
    return (
        <View>
            <Text className="text-xl font-semibold mb-6">Tidligere Bestillinger</Text>
            <VStack space={"lg"}>
                {data?.items.map((order) => (
                    <View
                        key={order.id}
                        className="bg-background-0 rounded-2xl p-5 border border-background-100"
                    >
                        <HStack className="justify-between">
                            <VStack>
                                <Text className="text-sm text-gray-500">{order.createdAt}</Text>
                                <Text className="text-lg font-medium mt-2">{order.foodPackageTitle}</Text>
                            </VStack>
                            <VStack className="items-end">
                                <Text className="text-green-600 text-sm">
                                    -2,4 kg CO2
                                </Text>
                                <Text className="text-gray-600 mt-2">{order.price} kr</Text>
                            </VStack>
                        </HStack>
                    </View>
                ))}
            </VStack>
        </View>
    )
}