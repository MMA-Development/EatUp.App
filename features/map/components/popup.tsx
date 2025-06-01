import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import React, {useCallback} from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { triggerSoftHaptic } from "@/lib/haptics";
import moment from "moment/moment";
import {router, useFocusEffect} from "expo-router";
import {useGetMealsQuery} from "@/features/meals/api/get-meals";

interface PopupProps {
  isOpen: boolean;
  closeDrawer: () => void;
  vendorId?: string;
}

export default function Popup({ isOpen, closeDrawer, vendorId }: PopupProps) {
  const handlePress = async (mealId: string) => {
    await triggerSoftHaptic();
    closeDrawer();
    router.push({
      pathname: "/(protected)/(tabs)/meals/[id]",
      params: { id: mealId },
    });
  };


  const { data, isLoading, refetch } = useGetMealsQuery({
    take: 10,
    skip: 0,
    vendorId: vendorId,
  });

  useFocusEffect(
      useCallback(() => {
        refetch();
      }, [])
  );

  return (
    <>
      <Drawer isOpen={isOpen} size="md" anchor="bottom" onClose={closeDrawer}>
        <DrawerBackdrop />
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="2xl">Måltider</Heading>
          </DrawerHeader>
          <DrawerBody>
            {isLoading && <ActivityIndicator size="large" className="mt-4" />}
            {!isLoading && data && data.items.length === 0 && (
              <Text className="text-center">Ingen måltider fundet</Text>
            )}
            {data &&
              data.items.map((meal) => (
                <TouchableOpacity
                  onPress={() => handlePress(meal.id)}
                  key={meal.id}
                >
                  <View className="bg-secondary-0 rounded-2xl border border-background-100 mb-4 flex-row gap-6 items-center">
                    <Image
                      source={{
                        uri: `https://eatup.blob.core.windows.net${meal.imageUrl}`,
                      }}
                      size={"lg"}
                      alt="image"
                      className="rounded-l-2xl"
                    ></Image>
                    <HStack className={"justify-between flex-1 p-4"}>
                      <VStack>
                        <Text className="text-lg font-medium ">
                          {meal.title}
                        </Text>
                        <Text className="text-sm text-gray-500 mt-2">
                          Afhent idag{" "}
                          {moment(meal.firstAvailablePickup)
                            .local()
                            .format("HH:mm")}{" "}
                          -{" "}
                          {moment(meal.lastAvailablePickup)
                            .local()
                            .format("HH:mm")}
                        </Text>
                      </VStack>
                      <VStack className="items-end">
                        <Text size="sm" className="line-through text-gray-400">
                          {meal.originalPrice} kr
                        </Text>
                        <Text size="lg" className="font-bold text-green-600">
                          {meal.price} kr
                        </Text>
                      </VStack>
                    </HStack>
                  </View>
                </TouchableOpacity>
              ))}
          </DrawerBody>
          <DrawerFooter>
            {/*<Button*/}
            {/*    onPress={() => {*/}
            {/*        closeDrawer*/}
            {/*    }}*/}
            {/*    className="flex-1"*/}
            {/*>*/}
            {/*    <ButtonText>Button</ButtonText>*/}
            {/*</Button>*/}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
