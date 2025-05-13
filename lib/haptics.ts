// utils/haptics.ts
import * as Haptics from 'expo-haptics';

export const triggerSoftHaptic = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
};

export const triggerMediumHaptic = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const triggerHeavyHaptic = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
