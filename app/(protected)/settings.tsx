import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import ProfileForm from "@/features/user/components/profile-form";
import { useLocation } from "@/features/map/hooks/useLocation";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import { View, Linking, Platform } from "react-native";
import { useEffect, useCallback } from "react";

export default function SettingsScreen() {
    const { permissionStatus, requestLocationPermission, checkPermission} = useLocation();

    useEffect(() => {
        void checkPermission();
    }, []);

    const handlePermissionChange = useCallback(async () => {
        if (permissionStatus === "undetermined") {
            await requestLocationPermission();
        } else {
            if (Platform.OS === 'ios') {
                void Linking.openURL('app-settings:');
            } else {
                void Linking.openSettings();
            }
        }
    }, [permissionStatus]);

    return (
        <Box className="flex-1 bg-background-0 rounded-lg p-6 w-full max-w-[400] self-center gap-6">
            <View>
                <Heading size="lg" className="mb-2">
                    Opdater Profil
                </Heading>
                <Text className="text-gray-600 mb-4" size="sm">
                    Ændre dine personlige detaljer herunder.
                </Text>
                <ProfileForm />
            </View>

            <View>
                <Heading size="lg" className="mb-2">
                    Advanceret
                </Heading>

                <View className="flex flex-row items-center justify-between mb-2">
                    <Text>Lokationstjenester</Text>
                    <Switch
                        size="md"
                        value={permissionStatus === "granted"}
                        onToggle={handlePermissionChange}
                        trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                        thumbColor={colors.neutral[50]}
                        ios_backgroundColor={colors.neutral[300]}
                    />
                </View>

                <Text size="sm" className={`${
                    permissionStatus === "granted"
                        ? "text-green-600"
                        : permissionStatus === "denied"
                            ? "text-red-600"
                            : "text-gray-600"
                }`}>
                    Status: {
                    permissionStatus === "granted"
                        ? "Aktiveret"
                        : permissionStatus === "denied"
                            ? "Deaktiveret"
                            : "Ikke bestemt"
                }
                </Text>
            </View>
        </Box>
    );
}