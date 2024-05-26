import { Stack } from "expo-router";


export default function AlarmsStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Alarms",
            }} />
        </Stack>
    );
}