import { useState } from "react";
import { Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useFetchPaymentSheetParamsMutation } from "@/features/stripe/api/fetch-payment-sheet-params";
import { useAppSelector } from "@/store/hooks";
import { selectStripeUserId, selectUser } from "@/features/auth/store";
import { router } from "expo-router";
import { triggerSoftHaptic } from "@/lib/haptics";
import { MyButton } from "@/components/ui/my-button";
import {Meal} from "@/features/meals/types";

interface CheckoutButtonProps {
    meal: Meal
}

export default function CheckoutButton({meal}: CheckoutButtonProps) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const customerId = useAppSelector(selectStripeUserId);
    const user = useAppSelector(selectUser);
    const [fetchParams, { isLoading }] = useFetchPaymentSheetParamsMutation();
    const [isInitializing, setIsInitializing] = useState(false);

    const handleCheckoutPress = async () => {
        if (!customerId) {
            Alert.alert("Error", "Customer ID is missing");
            return;
        }

        await triggerSoftHaptic();
        setIsInitializing(true);

        try {
            const response = await fetchParams({
                foodPackageId: meal.id,
                price: meal.price,
                vendorId: meal.vendorId,
                // Skal laves dynamisk og med rigtig data
                quantity: 1,
                userId: customerId!
            }).unwrap();

            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "EatUp, Inc.",
                customerId,
                customerEphemeralKeySecret: response.ephemeralKey,
                paymentIntentClientSecret: response.clientSecret,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: user ? "John Doe" : "John Doe",
                },
            });

            if (initError) {
                Alert.alert("Payment Sheet Init Error", initError.message);
                return;
            }

            const { error: presentError } = await presentPaymentSheet();

            if (presentError) {
                Alert.alert(`Error code: ${presentError.code}`, presentError.message);
            } else {
                router.replace("/profile"); // TODO: Navigate to specific order screen
            }
        } catch (e: any) {
            Alert.alert("Error", e.message || "Something went wrong");
        } finally {
            setIsInitializing(false);
        }
    };

    return (
        <MyButton
            className="w-full rounded-2xl bg-green-500"
            size="xl"
            variant="solid"
            disabled={isLoading || isInitializing}
            onPress={handleCheckoutPress}
        >
            Checkout
        </MyButton>
    );
}
