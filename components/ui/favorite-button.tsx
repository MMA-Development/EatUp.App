import {FavouriteIcon, Icon} from "@/components/ui/icon";
import {TouchableOpacity} from "react-native";
import {useState} from "react";

export default function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);



    const handlePress = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
        >
            <Icon
                as={FavouriteIcon}
                size="xl"
                className={isFavorite ? "text-red-500" : "text-white"}
            />
        </TouchableOpacity>
    );
}