import {FavouriteIcon, Icon} from "@/components/ui/icon";
import {TouchableOpacity} from "react-native";
import {useState} from "react";

export default function FavoriteButton() {
    const [color, setColor] = useState<string>("gray")

    return (
        <TouchableOpacity onPress={() => console.log("asd")}>
            <Icon
                as={FavouriteIcon}
                size={"xl"}
                color={color}
            />
        </TouchableOpacity>
    )
}