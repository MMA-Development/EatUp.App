import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function SearchScreen() {
    return (
        <View className={"flex-1"}>
            <MapView style={styles.map} showsUserLocation={true} showsMyLocationButton={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});