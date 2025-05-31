import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Animated,
    PanResponder,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {ArrowRightIcon, Icon} from "@/components/ui/icon";

const { width } = Dimensions.get('window');
const SWIPE_WIDTH = width - 40;
const BUTTON_WIDTH = 60;
const TRACK_HEIGHT = 60;
const BORDER_RADIUS = 30;
const BUTTON_COLOR = '#4caf50';

const SwipeButton = ({ onComplete }:any) => {
    const pan = useRef(new Animated.Value(0)).current;
    const [confirmed, setConfirmed] = useState(false);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 5;
            },
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx >= 0 && gesture.dx <= SWIPE_WIDTH - BUTTON_WIDTH) {
                    pan.setValue(gesture.dx);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > SWIPE_WIDTH - BUTTON_WIDTH - 20) {
                    // Complete the swipe
                    Animated.timing(pan, {
                        toValue: SWIPE_WIDTH - BUTTON_WIDTH,
                        duration: 150,
                        useNativeDriver: false,
                    }).start(() => {
                        setConfirmed(true);
                        onComplete?.();
                    });
                } else {
                    // Reset swipe
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    const fillWidth = pan.interpolate({
        inputRange: [0, SWIPE_WIDTH - BUTTON_WIDTH],
        outputRange: [BUTTON_WIDTH, SWIPE_WIDTH],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {confirmed ? 'Payment Confirmed ✅' : 'Swipe to Pay'}
            </Text>
            <View style={styles.swipeContainer}>
                {/* Green fill track that grows */}
                <Animated.View
                    style={[
                        styles.fill,
                        {
                            width: fillWidth,
                        },
                    ]}
                />

                {/* Swipe handle */}
                <Animated.View
                    style={[styles.swipeButton, { transform: [{ translateX: pan }] }]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles.buttonText}><Icon as={ArrowRightIcon} size={"xl"} className={"color-background-0"} /></Text>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    swipeContainer: {
        width: SWIPE_WIDTH,
        height: TRACK_HEIGHT,
        backgroundColor: '#ddd',
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    fill: {
        height: TRACK_HEIGHT,
        backgroundColor: BUTTON_COLOR,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
        borderRadius: BORDER_RADIUS,
    },
    swipeButton: {
        width: BUTTON_WIDTH,
        height: TRACK_HEIGHT,
        backgroundColor: BUTTON_COLOR,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default SwipeButton;
