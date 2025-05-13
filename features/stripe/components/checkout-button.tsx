import {useLayoutEffect} from "react";
import {MyButton} from "@/components/ui/my-button";
import {Alert} from "react-native";
import {useStripe} from "@stripe/stripe-react-native";
import {useFetchPaymentSheetParamsMutation} from "@/features/stripe/api/fetch-payment-sheet-params";
import {useAppSelector} from "@/store/hooks";
import {selectStripeUserId} from "@/features/auth/store";

export default function CheckoutButton() {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const customerId = useAppSelector(selectStripeUserId)
    const [init, {isLoading}] = useFetchPaymentSheetParamsMutation()


    const initializePaymentSheet = async () => {
        const res = await init({
            "userName": "PALLE",
            "foodPackageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "price": 6969,
            "foodPackageTitle": "Title",
            stripeCustomerId: customerId!,
            vendorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }).unwrap()
        await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customerId!,
            customerEphemeralKeySecret: res.ephemeralKey,
            paymentIntentClientSecret: res.clientSecret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
    };

    const openPaymentSheet = async () => {
        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useLayoutEffect(() => {
        initializePaymentSheet()
    }, []);


    return (
        <MyButton
            variant="solid"
            // disabled={!isLoading}
            onPress={openPaymentSheet}
        >
            Checkout
        </MyButton>
    );
}