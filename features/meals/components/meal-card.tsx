import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { TouchableOpacity, View } from "react-native";
import { ArrowRightIcon, FavouriteIcon, Icon } from "@/components/ui/icon";
import { Meal } from "@/features/meals/types";
import moment from "moment";
import { router } from "expo-router";
import { triggerSoftHaptic } from "@/lib/haptics";
import FavoriteButton from "@/components/ui/favorite-button";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  const handlePress = async () => {
    await triggerSoftHaptic();
    router.push({
      pathname: "/(protected)/(tabs)/meals/[id]",
      params: { id: meal.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card
        variant="elevated"
        className="border-[1px] relative min-w-96 my-2 mx-2 rounded-2xl p-0 border-background-100"
      >
        <Image
          source={{
            uri: `https://eatup.blob.core.windows.net${meal.imageUrl}`,
          }}
          alt="image"
          className="w-full h-32 rounded-t-2xl "
        />
        <View className="p-4 flex-col">
          <Heading size="lg" className="text-primary-900">
            {meal.vendorName}
          </Heading>
          <Text size="md" className="text-primary-700">
            {meal.title}
          </Text>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Text size="lg" className="font-bold text-green-600">
                {meal.price} kr
              </Text>
              <Text size="sm" className="line-through text-gray-400">
                {meal.originalPrice} kr
              </Text>
            </View>
            <Icon className="text-primary-500" as={ArrowRightIcon} />
          </View>

          <Text size="sm" className="text-gray-600 mt-1">
            Afhent i dag {moment(meal.firstAvailablePickup).format("LT")} –{" "}
            {moment(meal.lastAvailablePickup).format("LT")}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
