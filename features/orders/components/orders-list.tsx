import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useGetOrdersQuery } from "@/features/orders/api/orders";
import { useState, useCallback } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { triggerSoftHaptic } from "@/lib/haptics";
import { router } from "expo-router";
import moment from "moment/moment";

const ITEMS_PER_PAGE = 5;

export function OrdersList() {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, error } = useGetOrdersQuery(
    {
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      search: "",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const hasMore = data ? data.items.length < data.totalCount : false;

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const handlePress = async (order: any) => {
    if (order.paymentStatus !== "Completed") {
      return;
    }

    await triggerSoftHaptic();

    router.push({
      pathname: "/(protected)/order-pickup",
      params: {
        orderId: order.id,
      },
    });
  };

  const renderItem = useCallback(
    ({ item: order }: any) => (
      <TouchableOpacity key={order.id} onPress={() => handlePress(order)}>
        <View className="bg-background-0 rounded-2xl p-5 border border-background-100 mb-4">
          <HStack className="justify-between">
            <VStack>
              <Text className="text-sm text-gray-500">{moment.utc(order.createdAt).local().format("HH:mm")}</Text>
              <Text className="text-lg font-medium mt-2">
                {order.foodPackageTitle}
              </Text>
            </VStack>
            <VStack className="items-end">
              <Text className="text-green-600 text-sm">-2,4 kg CO2</Text>
              <Text className="text-gray-600 mt-2">{order.price} kr</Text>
                <Text className="text-gray-600 mt-2">Status: {order.paymentStatus}</Text>
            </VStack>
          </HStack>
        </View>
      </TouchableOpacity>
    ),
    []
  );
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold mb-4 px-4">
          Tidligere Bestillinger (0 af 0)
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="">
      <Text className="text-xl font-semibold mb-4 px-4">
        Tidligere Bestillinger ({data?.items.length} af {data?.totalCount})
      </Text>

      <FlashList
        data={data?.items ?? []}
        renderItem={renderItem}
        estimatedItemSize={200}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore ? (
            <Button
              onPress={loadMore}
              variant="outline"
              className="my-4"
              disabled={isFetching}
            >
              <ButtonText>
                {isFetching ? "Indlæser..." : "Vis flere"}
              </ButtonText>
            </Button>
          ) : null
        }
      />
    </View>
  );
}
