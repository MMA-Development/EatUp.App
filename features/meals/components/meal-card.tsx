import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Image } from "@/components/ui/image"
import {View} from "react-native";
import {ArrowRightIcon, Icon} from "@/components/ui/icon";

export default function MealCard() {
    return (
        <Card variant="elevated" className="border-[1px] relative w-96 my-2 mx-2 rounded-2xl p-0 border-background-100">
            <Image
                source={{
                    uri: "https://gluestack.github.io/public-blog-video-assets/mountains.png",
                }}
                alt="image"
                className="w-full h-auto rounded-t-2xl aspect-video"
            />
            <View className={"p-4"}>
                <Heading size="md" className="mb-1">
                    Quick Start
                </Heading>
                <Text size="sm">Start building your next project in minutes</Text>
                    <Icon className={"absolute bottom-4 right-4"}  as={ArrowRightIcon}></Icon>
            </View>

        </Card>
    )
}