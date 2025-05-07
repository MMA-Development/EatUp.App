import { ScrollView, View, Text } from "react-native";
import {useEffect, useState} from "react";
import { MyButton } from "@/components/ui/my-button";
import {useLocalSearchParams, useRouter} from "expo-router";

const categories = [
    "Alt",
    "Morgenmad",
    "Aftensmad",
    "Slik",
    "Vegetar",
    "Vegansk"
];

export default function MealCategories() {
    const router = useRouter();
    const { categories: urlCategories } = useLocalSearchParams<{ categories?: string }>();

    // Convert URL param to array safely
    const parseCategories = (value?: string): string[] => {
        if (!value) return ["Alt"];
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : ["Alt"];
        } catch {
            return ["Alt"];
        }
    };

    const [selected, setSelected] = useState<string[]>(parseCategories(urlCategories));

    // Update state when URL param changes
    useEffect(() => {
        setSelected(parseCategories(urlCategories));
    }, [urlCategories]);

    const toggleCategory = (category: string) => {
        let updated: string[];

        if (category === "Alt") {
            updated = ["Alt"];
        } else {
            if (selected.includes(category)) {
                updated = selected.filter(item => item !== category);
            } else {
                updated = [...selected.filter(item => item !== "Alt"), category];
            }

            if (updated.length === 0) {
                updated = ["Alt"];
            }
        }

        setSelected(updated);

        // Update URL with encoded array
        router.setParams({
            categories: JSON.stringify(updated)
        });
    };


    return (
        <View className={"py-4 gap-2"}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className="px-4 gap-2 flex-row">
                    {categories.map(category => (
                        <MyButton
                            key={category}
                            className={selected.includes(category) ? "bg-emerald-500" : ""}
                            action={"secondary"}
                            onPress={() => toggleCategory(category)}
                        >
                            {category}
                        </MyButton>
                    ))}
                </View>
            </ScrollView>

            {/*<ScrollView horizontal={true} className="px-4 gap-4">*/}
            {/*    {selected.map((category, index) =>*/}
            {/*        <Badge key={index} size={"md"} action={"muted"} >*/}
            {/*            <BadgeText>{category}</BadgeText>*/}
            {/*            <BadgeIcon as={CheckIcon}/>*/}
            {/*        </Badge>*/}
            {/*    )}*/}
            {/*</ScrollView>*/}
        </View>
    );
}
