import React, {useState} from 'react';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {markers} from "@/constants/markers";
import {Text} from "@/components/ui/text";
import SegmentedControl from "@/components/ui/segmented-control";
import {Input, InputField} from "@/components/ui/input";
import MealList from "@/features/meals/components/meal-list";
import MealCategories from "@/features/meals/components/meal-categories";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function SearchScreen() {
    const [selectedView, setSelectedView] = useState(0);
    const barHeight = useBottomTabBarHeight();
    const {bottom, top} = useSafeAreaInsets();
    return (
        <View className={"flex-1 h-full bg-background-0"}>
            <View className={"relative h-full flex-1 flex"}>
                <View className={"px-4 flex flex-col gap-8 z-10"} style={{
                    marginTop: top,
                    marginBottom: 18,
                }}>
                        <Input className={"bg-background-0 rounded-md"} size={"xl"}>
                            <InputField placeholder={"Søg"} size={"2xl"}/>
                        </Input>
                        <SegmentedControl options={["Liste", "Kort"]} onChange={(index) => setSelectedView(index)}/>
                </View>


                {selectedView === 0 ? (
                    // List View
                    <View className={"flex-1 gap-4 flex-grow"}>
                        <MealCategories/>
                        <MealList/>
                    </View>
                ) : (
                    // Map View

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

                )}
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        zIndex: 1,
        width: "100%",
        top: 0,
        position: 'absolute'
    },
});