import React from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {markers} from "@/constants/markers";
import {Text} from "@/components/ui/text";

export default function SearchScreen() {
    return (
        <View className={"flex-1"}>
            <MapView style={styles.map} showsUserLocation={true} showsMyLocationButton={true}>
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker}>
                        <Callout>
                            <View className={"m-2"}>
                                <Text>{marker.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});