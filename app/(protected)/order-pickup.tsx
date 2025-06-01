import {Alert, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Heading} from "@/components/ui/heading";
import SwipeButton from "@/components/ui/swipe-button";
import {usePickupOrderMutation} from "@/features/orders/api/pickup-order";
import {useLocalSearchParams} from "expo-router";
import {eatupApi} from "@/lib/api-slice";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal";
import {useState} from "react";
import {CloseIcon, Icon, StarIcon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";

export default function OrderPickupScreen() {
    const {orderId} = useLocalSearchParams<{ orderId: string }>();
    const [pickupOrder] = usePickupOrderMutation();

    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(0);

    const handlePickup = async () => {
        try {
            const response = await pickupOrder(orderId);
            if (response.error) {
                alert("Fejl ved afhentning");
            } else {
                alert("Afhentning gennemført!");
            }
        } catch (error) {
            console.error("Error during pickup:", error);
            alert("Der opstod en fejl under afhentning. Prøv igen senere.");
        }
    };

    const submitMealRating = () => {
        Alert.alert("Tak!", "Tak for din vurdering.");
    };

    const Star = ({index}: { index: number }) => (
        <TouchableOpacity onPress={() => setRating(index)}>
            <Icon
                as={StarIcon}
                size={"xl"}
                color={index <= rating ? "#FFD700" : "#CBD5E1"}
                style={{ marginHorizontal: 4 }}
            />
        </TouchableOpacity>
    );
    return (
        <SafeAreaView className={"flex-1 justify-center"}>
            <View>
                <Heading size={"4xl"} className={"self-center text-center"}>
                    Afhentning af Morgenbrød
                </Heading>
                <SwipeButton onComplete={() => handlePickup()}/>
            </View>
            <Button onPress={() => setShowModal(true)} className="mt-4">
                <ButtonText>Afhent</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="md"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Hvordan var måltidet?
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <View className="flex-row mb-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} index={i}/>
                            ))}
                        </View>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <ButtonText>Annuller</ButtonText>
                        </Button>
                        <Button
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <ButtonText>Bedøm</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </SafeAreaView>
    );
}
