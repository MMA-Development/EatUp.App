import {Tabs} from 'expo-router';
import {useColorScheme} from 'react-native';
import {DefaultTheme} from "@react-navigation/native";
import {CalendarDaysIcon, FavouriteIcon, Icon, SearchIcon, SettingsIcon} from "@/components/ui/icon";

const lightTheme = {
    ...DefaultTheme,
    headerStyle: {
        backgroundColor: 'rgb(255, 255, 255)',
        colorBorder: 'rgb(26, 23, 23)',
    },
    headerTintColor: 'rgb(23, 23, 23)',
};

const darkTheme = {
    ...DefaultTheme,
    headerStyle: {
        backgroundColor: 'rgb(23, 23, 23)',
        colorBorder: 'rgb(26, 23, 23)',
    },
    headerTintColor: 'rgb(254, 254, 255)',
};

export default function TabsLayout() {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? darkTheme : lightTheme;
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: theme.headerStyle.backgroundColor,
                borderStyle: "solid",
            },
            tabBarStyle: {
                backgroundColor: theme.headerStyle.backgroundColor,
            },
            headerTintColor: theme.headerTintColor,
            tabBarActiveTintColor: 'tomato',
            headerShown: false,
            animation: "fade"
        }}>
            <Tabs.Screen name={"meals/index"} options={{title: "Udforsk", tabBarLabelStyle: { fontSize: 14}, tabBarIcon: (({focused}) => { return <Icon color={focused ? "tomato" : ""} size={"xl"} as={CalendarDaysIcon} />}), headerShown: false}}></Tabs.Screen>
            <Tabs.Screen name={"meals/[id]"} options={{ href: null }} />
            <Tabs.Screen name={"search"} options={{title: "Søg", tabBarLabelStyle: { fontSize: 14}, tabBarIcon: (({focused}) => { return <Icon color={focused ? "tomato" : ""} size={"xl"} as={SearchIcon} />}), headerShown: false}}></Tabs.Screen>
            <Tabs.Screen name={"favorites"} options={{title: "Favoritter", tabBarLabelStyle: { fontSize: 14}, tabBarIcon: (({focused}) => { return <Icon color={focused ? "tomato" : ""} size={"xl"} as={FavouriteIcon} />}), headerShown: false}}></Tabs.Screen>
            <Tabs.Screen name={"profile"} options={{title: "Profil", tabBarLabelStyle: { fontSize: 14}, tabBarIcon: (({focused}) => { return <Icon color={focused ? "tomato" : ""} size={"xl"} as={SettingsIcon} />}), headerShown: false}}></Tabs.Screen>
        </Tabs>
    )
}