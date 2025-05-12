import {startAppListening} from "@/store/listener-middleware";
import {stripe} from "@/features/stripe/api/fetch-payment-sheet-params";

startAppListening({
    matcher: stripe.endpoints.fetchPaymentSheetParams.matchFulfilled,
    effect: async (action, listenerApi) => {

    }
})