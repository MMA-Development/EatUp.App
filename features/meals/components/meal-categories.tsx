import { ScrollView, View } from "react-native";
import { useState } from "react";
import { MyButton } from "@/components/ui/my-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { cn } from "@/lib/cn";
import { useGetCategoriesQuery } from "@/features/meals/api/get-categories";

export default function MealCategories() {
    const router = useRouter();

    // Grab any existing category IDs from URL (as a string[]), or default to empty array
    const {
        categories: urlCategories = [],
    } = useLocalSearchParams<{ categories?: string[] }>();

    // Initialize selected IDs from URL params
    const [selected, setSelected] = useState<string[]>(urlCategories);

    // Fetch up to 10 categories
    const { data } = useGetCategoriesQuery({ skip: 0, take: 10 });
    const categories = data?.items || [];

    // Helper to sync state → URL
    const updateParams = (ids: string[]) => {
        router.setParams({ categories: ids });
    };

    // Toggle a single category ID on/off
    const toggle = (id: string) => {
        const next = selected.includes(id)
            ? selected.filter((x) => x !== id)
            : [...selected, id];

        setSelected(next);
        updateParams(next);
    };

    // Clear all selections
    const clearAll = () => {
        setSelected([]);
        updateParams([]);
    };

    return (
        <View className="py-4 gap-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="px-4 flex-row gap-2">
                    <MyButton
                        className={cn("rounded-full", {
                            "bg-emerald-500 text-white": selected.length === 0,
                        })}
                        action="secondary"
                        onPress={clearAll}
                    >
                        All
                    </MyButton>

                    {categories.map((cat) => (
                        <MyButton
                            key={cat.id}
                            className={cn("rounded-full", {
                                "bg-emerald-500 text-white": selected.includes(cat.id),
                            })}
                            action="secondary"
                            onPress={() => toggle(cat.id)}
                        >
                            {cat.name}
                        </MyButton>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
