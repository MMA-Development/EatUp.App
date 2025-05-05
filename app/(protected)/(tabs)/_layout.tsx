import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import {DefaultTheme} from "@react-navigation/native";

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

export default function TabsLayout(){
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
            headerTintColor: theme.headerTintColor
        }}>
            <Tabs.Screen name={"index"} options={{title: "Home"}}></Tabs.Screen>
   {/*         <Tabs.Screen name={"search"}></Tabs.Screen>
            <Tabs.Screen name={"favorites"}></Tabs.Screen>
            <Tabs.Screen name={"profile"}></Tabs.Screen>*/}
        </Tabs>
    )
}