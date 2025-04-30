import { Tabs } from 'expo-router';

export default function TabsLayout(){
    return (
        <Tabs>
            <Tabs.Screen name={"index"}></Tabs.Screen>
   {/*         <Tabs.Screen name={"search"}></Tabs.Screen>
            <Tabs.Screen name={"favorites"}></Tabs.Screen>
            <Tabs.Screen name={"profile"}></Tabs.Screen>*/}
        </Tabs>
    )
}