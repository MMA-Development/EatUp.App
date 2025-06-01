import { FavouriteIcon, Icon } from "@/components/ui/icon";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { cn } from "@/lib/cn";

type FavoriteButtonProps = {
  onToggle: (favorited: boolean) => boolean | Promise<boolean>;
  isFavorite: boolean;
};

export default function FavoriteButton({
  onToggle,
  isFavorite: favorited,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handlePress = async () => {
    var result = await onToggle?.(!isFavorite);
    setIsFavorite(result);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        as={FavouriteIcon}
        size="xl"
        className={cn({
          "text-red-500 ": isFavorite,
          "text-white": !isFavorite,
        })}
      />
    </TouchableOpacity>
  );
}
