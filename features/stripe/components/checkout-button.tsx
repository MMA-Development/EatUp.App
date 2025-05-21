import {useLayoutEffect, useState} from "react";
import {MyButton} from "@/components/ui/my-button";
import {Alert} from "react-native";
import {useStripe} from "@stripe/stripe-react-native";
import {useFetchPaymentSheetParamsMutation} from "@/features/stripe/api/fetch-payment-sheet-params";
import {useAppSelector} from "@/store/hooks";
import {selectStripeUserId} from "@/features/auth/store";

export default function CheckoutButton() {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const customerId = useAppSelector(selectStripeUserId);
    const [init, {isLoading}] = useFetchPaymentSheetParamsMutation();

    const [paymentSheetReady, setPaymentSheetReady] = useState(false);

    const initializePaymentSheet = async () => {
        try {
            const res = await init({
                userName: "PALLE",
                foodPackageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                price: 6969,
                foodPackageTitle: "Title",
                stripeCustomerId: customerId!,
                vendorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
            Alert.alert("Success", "Din ordrer er nu betalt!");
        }
    };

    useLayoutEffect(() => {
        if (customerId) {
            initializePaymentSheet();
        }
    }, [customerId]);

    return (
        <MyButton
            variant="solid"
            disabled={!paymentSheetReady || isLoading}
            onPress={openPaymentSheet}
        >
            Checkout
        </MyButton>
    );
}
