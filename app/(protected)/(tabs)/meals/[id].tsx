import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { MyButton } from "@/components/ui/my-button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { ArrowLeftIcon, FavouriteIcon, Icon } from "@/components/ui/icon";
import moment from "moment";
import { router } from "expo-router";
import CheckoutButton from "@/features/stripe/components/checkout-button";
import { useLocalSearchParams } from "expo-router";
import { useGetMealQuery } from "@/features/meals/api/get-meal";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectIcon,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useMemo, useState } from "react";
import FavoriteButton from "@/components/ui/favorite-button";
import {
  useDeleteFavoriteMutation,
  useFavoritesMutation,
} from "@/features/meals/api/favorites";
import { useStore } from "expo-router/build/global-state/router-store";
import { useAppSelector } from "@/store/hooks";

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [setFavorite] = useFavoritesMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const userFavorites = useAppSelector((state) => state.auth.userFavorites);
  const [quantity, setQuantity] = useState<string>("1");

  const isFavorite = useMemo(() => {
    return userFavorites?.includes(id);
  }, [userFavorites, id]);

  const {
    data: meal,
    isLoading,
    error,
  } = useGetMealQuery(id!, {
    skip: !id,
  });

  if (isLoading || !id) {
    return (
      <View className="flex-1 bg-background-0 justify-center items-center">
        <Text>Indlæser måltid...</Text>
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View className="flex-1 bg-background-0 justify-center items-center p-4">
        <Text className="text-center mb-4">
          Beklager, men vi kunne ikke finde det ønskede måltid.
        </Text>
        <MyButton action="secondary" onPress={() => router.back()}>
          Gå tilbage
        </MyButton>
      </View>
    );
  }

  const generateQuantityOptions = (available: number, maxOrder: number) => {
    const maxSelectable = Math.min(available, maxOrder);
    return Array.from({ length: maxSelectable }, (_, i) => i + 1);
  };

  return (
    <View className="flex-1 bg-background-0">
      {/* Header Image */}
      <View className="relative h-72">
        <Image
          className="w-full h-full"
          source={{
            uri: `https://eatup.blob.core.windows.net${meal.imageUrl}`,
          }}
          alt={meal.title}
        />
        <View
          className={
            "bg-gray-900/50 absolute top-12 right-4 z-10 rounded-full p-2"
          }
        >
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={async (favorited) => {
              if (favorited) {
                const response = await setFavorite(id);
                if (response.error) {
                  console.error("Error addidng favorite: ", id, response.error);
                  return false;
                }
                return true;
              } else {
                const response = await deleteFavorite(id);
                if (response.error) {
                  console.error("Error removing favorite:" + response.error);
                  return false;
                }
                return false;
              }
            }}
          />
        </View>
        <Pressable
          onPress={() => router.back()}
          className="bg-gray-900/50 absolute top-12 left-4 z-10 rounded-full p-2"
        >
          <Icon as={ArrowLeftIcon} size="xl" className={"text-white"} />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4 bg-background-0 -mt-6 rounded-t-3xl">
        {/* Header Information */}
        <View className="space-y-2">
          <Heading size="xl" className="text-primary-900">
            {meal.vendorName}
          </Heading>
          <Text size="lg" className="text-primary-700">
            {meal.title}
          </Text>

          {/* Pricing */}
          <View className="flex-row items-center space-x-2 mt-2 gap-2">
            <Text size="2xl" className="font-bold text-green-600">
              {meal.price} kr
            </Text>
            <Text size="lg" className="line-through text-gray-400">
              {meal.originalPrice} kr
            </Text>
          </View>

          {/* Pickup Time */}
          <View className="bg-background-info p-4 rounded-xl mt-4">
            <Text size="md" className="font-semibold">
              Afhentning i dag
            </Text>
            <Text size="md" className="text-gray-600">
              {moment(meal.firstAvailablePickup).format("HH:mm")} -{" "}
              {moment(meal.lastAvailablePickup).format("HH:mm")}
            </Text>
          </View>

          {/* Categories */}
          <View className="flex-row flex-wrap gap-2 mt-4">
            {meal.categories.map((category, index) => (
              <View
                key={index}
                className="bg-indicator-info px-3 py-1 rounded-full"
              >
                <Text size="sm" className="text-primary-900">
                  {category.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text size="md" className="font-semibold mb-2">
              Beskrivelse
            </Text>
            <Text size="md" className="text-gray-600">
              {meal.description}
            </Text>
          </View>

          {/* Quantity Information */}
          <View className="bg-amber-100 p-4 rounded-xl mt-4">
            <Text size="md" className="font-semibold">
              Antal tilgængelige portioner
            </Text>
            <Text size="md" className="text-gray-600">
              {meal.available} stk. (Max {meal.maxOrderQuantity} pr. ordre)
            </Text>
          </View>
          <Select
            className={"self-center p-4"}
            defaultValue={"1"}
            onValueChange={(e) => setQuantity(e)}
          >
            <SelectTrigger>
              <SelectInput />
              <SelectIcon as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {generateQuantityOptions(
                  meal.available,
                  meal.maxOrderQuantity
                ).map((num) => (
                  <SelectItem
                    key={num}
                    className="justify-center"
                    label={num.toString()}
                    value={num.toString()}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>

        {/* Padding for button */}
        <View className="h-24" />
      </ScrollView>

      {/* Reserve Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-0">
        {/*<MyButton size="xl" action="positive">*/}
        {/*    Reserver for {meal.price} kr*/}
        {/*</MyButton>*/}
        {Platform.OS !== "web" && (
          <CheckoutButton meal={meal} quantity={quantity} />
        )}
      </View>
    </View>
  );
}
