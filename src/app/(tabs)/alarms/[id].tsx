import { View, Text } from "@/components/Themed";
import { useAlarmList } from "@/providers/AlarmListProvider";
import { AlarmItem } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";


export default function AlarmPage() {
    const { id } = useLocalSearchParams();
    const { items } = useAlarmList();

    if (!id) {
        return (
            <View>
                <Stack.Screen options={{ title: "Details" }} />
                <Text>No Alarm Id</Text>
            </View>
        );
    }

    const itemInfo: AlarmItem | undefined = items.find((a) => { return a.id.toString() == id });
    if (!itemInfo) {
        return (
            <View>
                <Stack.Screen options={{ title: "Details" }} />
                <Text>Alarm Not Found</Text>
            </View>
        );
    }
    return (
        <View>
            <Stack.Screen options={{ title: "Details" }} />
            <Text>Alarm: {itemInfo.time.toLocaleTimeString([],{
                hour: '2-digit',
                minute: '2-digit'
            })}, ID: {itemInfo.id}</Text>
        </View>

    );
}