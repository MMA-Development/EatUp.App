import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {Text} from "@/components/ui/text";
import SegmentedControl from "@/components/ui/segmented-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import MealCategories from "@/features/meals/components/meal-categories";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useVendorsQuery} from "@/features/map/api/vendors";
import {useLocalSearchParams} from "expo-router";
import {Slider, SliderFilledTrack, SliderThumb, SliderTrack} from '@/components/ui/slider';
import {useDebouncedState} from "@/hooks/use-debounced-state";
import MealList from "@/features/meals/components/meal-list";
import {useGetMealsQuery} from "@/features/meals/api/get-meals";
import {useLocation} from '@/features/map/hooks/useLocation';
import { SearchIcon } from '@/components/ui/icon';

export default function SearchScreen() {
    const [selectedView, setSelectedView] = useState(0);
    const {top} = useSafeAreaInsets();
    const {categories} = useLocalSearchParams<{ categories?: string }>();

    const [searchValue, setSearchValue] = useDebouncedState('', 300);

    const {latitude, longitude, permissionStatus, requestLocationPermission} = useLocation();


    // if (!latitude || !longitude) {
    //     return <View>Indlæser lokation...</View>;
    // }

    useEffect(() => {
        if (latitude && longitude) {
            setParams(prev => ({
                ...prev,
                latitude,
                longitude,
            }));
        }
    }, [latitude, longitude]);

    const {data: meals, isLoading: mealsIsLoading} = useGetMealsQuery({
        skip: 0,
        take: 10,
        search: searchValue,
    }, {
        refetchOnMountOrArgChange: true,
    });

    const [params, setParams] = useState({
        take: 10,  // number of items to fetch
        skip: 0,   // pagination start point
        longitude: 0,  // longitude for geolocation
        latitude: 0,   // latitude for geolocation
        radius: 30000,    // search radius in metres
    });

    const {data, error, isLoading} = useVendorsQuery({...params, search: searchValue}, {
        refetchOnMountOrArgChange: true
    });

    return (
        <View className={"flex-1 h-full bg-background-0"}>
            <View className={"relative h-full flex-1 flex"}>
                <View className={"px-4 flex flex-col gap-8 z-10"} style={{
                    marginTop: top,
                    marginLeft: 8,
                    marginRight: 8,
                    marginBottom: 18,
                }}>
                    <Input className={"bg-background-0 rounded-xl"} size={"xl"}>
                        <InputSlot className="pl-3">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField
                            onChangeText={setSearchValue}
                            placeholder={"Søg"}
                            />
                    </Input>
                    <View className="flex flex-row items-center px-4 space-x-4">
                        <Slider
                            className="flex-1"
                            defaultValue={params.radius}
                            maxValue={30000}
                            minValue={1000}
                            step={1000}
                            onChangeEnd={(val) => setParams(prevState => ({ ...prevState, radius: val }))}
                            size="lg"
                            orientation="horizontal"
                            isDisabled={false}
                            isReversed={false}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>

                        <Text className="text-typography-900 min-w-[60px] text-right">
                            {params.radius / 1000} km
                        </Text>
                    </View>
                    {/*<Text className={"text-typography-900"}>Lokation: {latitude}, {longitude}</Text>*/}
                    <SegmentedControl options={["Liste", "Kort"]} onChange={(index) => setSelectedView(index)}/>
                </View>


                {selectedView === 0 ? (
                    // List View
                    <View className={"flex-1 gap-4 flex-grow px-2"}>
                        <MealCategories/>
                        {mealsIsLoading ? (
                            <ActivityIndicator size="large" className="mt-4"/>
                        ) : meals?.items?.length ? (
                            <MealList meals={meals.items}/>
                        ) : (
                            <Text className="text-center text-typography-500 mt-4">Ingen måltider</Text>
                        )}
                    </View>
                ) : (
                    // Map View
                    Platform.OS !== 'web' && (
                        <MapView style={styles.map} showsUserLocation={true} showsMyLocationButton={true}>
                            {data?.items.map((marker, index) => (
                                <Marker key={index}
                                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}>
                                    <Callout>
                                        <View className={"m-2"}>
                                            <Text>{marker.name}</Text>
                                        </View>
                                    </Callout>
                                </Marker>
                            ))}
                        </MapView>)
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