import {useLayoutEffect, useState} from "react";
import {MyButton} from "@/components/ui/my-button";
import {Alert} from "react-native";
import {useStripe} from "@stripe/stripe-react-native";
import {useFetchPaymentSheetParamsMutation} from "@/features/stripe/api/fetch-payment-sheet-params";
import {useAppSelector} from "@/store/hooks";
import {selectStripeUserId} from "@/features/auth/store";
import {router} from "expo-router";

export default function CheckoutButton() {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const customerId = useAppSelector(selectStripeUserId);
    const [init, {isLoading}] = useFetchPaymentSheetParamsMutation();

    const [paymentSheetReady, setPaymentSheetReady] = useState(false);

    const initializePaymentSheet = async () => {
        try {
            const res = await init({
                userName: "PALLE",
                foodPackageId: "4079674e-712a-4fd6-c4fc-08dd98411ae5",
                price: 6969,
                foodPackageTitle: "Title",
                stripeCustomerId: customerId!,
                vendorId: "56303fa6-453c-4111-a0fe-08dd976657a9",
            }).unwrap();

            const {error} = await initPaymentSheet({
                merchantDisplayName: "Example, Inc.",
                customerId: customerId!,
                customerEphemeralKeySecret: res.ephemeralKey,
                paymentIntentClientSecret: res.clientSecret,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: "Jane Doe",
                },
            });

            if (!error) {
                setPaymentSheetReady(true);
            } else {
                Alert.alert("Initialization Error", error.message);
            }
        } catch (e: any) {
            Alert.alert("Error", e.message || "Failed to initialize payment sheet");
        }
    };

    const openPaymentSheet = async () => {
        const {error} = await presentPaymentSheet();
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            // TODO go to the specific order instead of just the profile page
            router.replace('/profile')
        }
    };

    useLayoutEffect(() => {
        if (customerId) {
            initializePaymentSheet();
        }
    }, [customerId]);

    return (
        <MyButton
            className={"w-full rounded-2xl bg-success-500"}
            size={'xl'}
            variant="solid"
            disabled={!paymentSheetReady || isLoading}
            onPress={openPaymentSheet}
        >
            Checkout
        </MyButton>
    );
}
