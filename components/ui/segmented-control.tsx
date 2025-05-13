import React, {useEffect, useState} from "react";
import {Dimensions, Pressable} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from "react-native-reanimated";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {cn} from "@/lib/cn";
import {triggerSoftHaptic} from "@/lib/haptics";

interface SegmentedControlProps {
    options: string[];
    onChange: (val: number) => void;
}

const SegmentedControl = ({options = [], onChange}: SegmentedControlProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const tabWidth = Dimensions.get("window").width / options.length;

    // Shared animated value for the sliding background
    const translateX = useSharedValue(0);

    const handlePress = async (index: number) => {
        await triggerSoftHaptic()
        setSelectedIndex(index);
        onChange(index);
        translateX.value = withTiming(index * tabWidth, {duration: 250});
    };

    // Animate on mount
    useEffect(() => {
        translateX.value = withTiming(selectedIndex * tabWidth, {duration: 250});
    }, []);

    // Animated style for the sliding pill
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
    }));

    return (
        <HStack className="relative bg-background-100 rounded-full h-10 overflow-hidden self-center w-full max-w-md">
            {/* Sliding background indicator */}
            <Animated.View
                style={[animatedStyle, {width: tabWidth, height: "100%"}]}
                className="absolute top-0 left-0 bg-emerald-500 rounded-full"
            />

            {/* Segment Buttons */}
            {options.map((option, index) => {
                const isSelected = selectedIndex === index;
                return (
                    <Pressable
                        key={index}
                        className="flex-1 items-center justify-center rounded-full"
                        onPress={() => handlePress(index)}
                    >
                        <Text
                            size="lg"
                            className={cn("font-semibold", {
                                "text-white": isSelected,
                                "text-typography-900": !isSelected,
                            })}
                        >
                            {option}
                        </Text>
                    </Pressable>
                );
            })}
        </HStack>
    );
};

export default SegmentedControl;
