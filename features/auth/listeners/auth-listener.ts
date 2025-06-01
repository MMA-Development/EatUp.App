import { startAppListening } from "@/store/listener-middleware";
import { authenticate } from "../api/login";
import { me } from "@/features/auth/api/me";
import {
  logout,
  setStripeUserID,
  setToken,
  setUser,
  setUserFavorites,
} from "@/features/auth/store";
import { router } from "expo-router";

export function setupAuthListeners(): void {
  startAppListening({
    matcher: authenticate.endpoints.authenticate.matchFulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.cancelActiveListeners();

      // Get token and username from action
      const token = action.payload;
      const { username } = action.meta.arg.originalArgs;

      // Set user and token
      listenerApi.dispatch(setUser(username));
      listenerApi.dispatch(setToken(token));

      // Fetch the vendor
      const result = await listenerApi.dispatch(
        me.endpoints.getMe.initiate(undefined, {
          forceRefetch: true,
        })
      );

      if ("error" in result) {
        listenerApi.dispatch(logout());
        return;
      }

      if (result.data) {
        listenerApi.dispatch(setStripeUserID(result.data.stripeCustomerId));
        listenerApi.dispatch(
          setUserFavorites(result.data.favorites?.map((x) => x.mealId) || [])
        );
      }

      router.replace("/(protected)/(tabs)/meals");
    },
  });
}
