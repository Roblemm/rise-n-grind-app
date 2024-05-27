import { globalStyles } from "@/components/Styles";
import { View, Text } from "@/components/Themed";
import { useAlarmList } from "@/providers/AlarmListProvider";
import { AlarmClass } from "@/utils/AlarmClass";
import { Stack, useLocalSearchParams } from "expo-router";


export default function AlarmPage() {
    const { id } = useLocalSearchParams();
    const { items } = useAlarmList();

    if (!id) {
        return (
            <View>
                <Stack.Screen options={{ title: "Details", headerStyle: globalStyles.barColor }} />
                <Text>No Alarm Id</Text>
            </View>
        );
    }

    const itemInfo: AlarmClass | undefined = items.find((a) => { return a.id.toString() == id });
    if (!itemInfo) {
        return (
            <View>
                <Stack.Screen options={{ title: "Details", headerStyle: globalStyles.barColor }} />
                <Text>Alarm Not Found</Text>
            </View>
        );
    }
    return (
        <View>
            <Stack.Screen options={{ title: "Details", headerStyle: globalStyles.barColor }} />
            <Text>Alarm: {itemInfo.get12HourTime()}, ID: {itemInfo.id}, Active: {itemInfo.active}, Repeats: {itemInfo.repeat.join()}</Text>
        </View>

    );
}