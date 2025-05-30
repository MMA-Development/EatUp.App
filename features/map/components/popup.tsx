import {Button, ButtonText} from "@/components/ui/button"
import {
    Drawer,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from "@/components/ui/drawer"
import {Heading} from "@/components/ui/heading"
import {Text} from "@/components/ui/text"
import React from "react"
import {TouchableOpacity, View} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Image} from "@/components/ui/image";
import {triggerSoftHaptic} from "@/lib/haptics";

interface PopupProps {
    isOpen: boolean
    closeDrawer: () => void
}

const handlePress = async () => {
    await triggerSoftHaptic();
    // router.push({
    //     pathname: "/(protected)/(tabs)/meals/[id]",
    //     params: { id: meal.id }
    // })
};

export default function Popup({isOpen, closeDrawer}: PopupProps) {

    return (
        <>
            <Drawer isOpen={isOpen} size="md" anchor="bottom" onClose={closeDrawer}>
                <DrawerBackdrop/>
                <DrawerBackdrop/>
                <DrawerContent>
                    <DrawerHeader>
                        <Heading size="2xl">Coop 365 Odense</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <TouchableOpacity onPress={handlePress}>
                            <View
                                className="bg-secondary-0 rounded-2xl border border-background-100 mb-4 flex-row gap-6 items-center"
                            >
                                <Image source={{
                                    uri: "https://gluestack.github.io/public-blog-video-assets/mountains.png",
                                }}
                                       size={"lg"}
                                       alt="image"
                                       className="rounded-l-2xl"></Image>
                                <HStack className={"justify-between flex-1 p-4"}>
                                    <VStack className={""}>
                                        <Text className="text-lg font-medium ">
                                            Navn på meal
                                        </Text>
                                        <Text className="text-sm text-gray-500 mt-2">
                                            Afhent idag kl 12:00 - 13:00
                                        </Text>
                                    </VStack>
                                    <VStack className="items-end">
                                        <Text className="text-green-600 text-sm">
                                            asd
                                        </Text>
                                        <Text className="text-gray-600 mt-2">
                                            pris kr
                                        </Text>
                                    </VStack>
                                </HStack>
                            </View>
                        </TouchableOpacity>
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
    )
}