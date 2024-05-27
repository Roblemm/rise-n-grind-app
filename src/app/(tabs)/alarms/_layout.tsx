import { globalStyles } from "@/components/Styles";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";


export default function AlarmsStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerStyle: globalStyles.barColor,
                title: "Alarms",
            }} />
        </Stack>
    );
}