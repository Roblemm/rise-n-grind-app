import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";


export default function AlarmPage() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Alarm: {id}</Text>
        </View>
        
    );
}