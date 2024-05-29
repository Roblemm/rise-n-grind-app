import { globalStyles } from "@/components/Styles";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";


export default function AlarmsStack() {
    return (
        <Stack screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "white",
            },
            headerStyle: globalStyles.barColor,
            headerTintColor: '#fff',
          }}>
            <Stack.Screen name="index" options={{
                title: "Alarms",
            }} />
        </Stack>
    );
}