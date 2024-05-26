import { View, Text } from "@/components/Themed";
import { Alarm } from "@/types";
import { alarms } from "@assets/Alarms";
import { Stack, useLocalSearchParams } from "expo-router";


export default function AlarmPage() {
    const { id } = useLocalSearchParams();

    if(!id){
        return (<Text>Alarm Not Found</Text>);
    }

    const itemInfo: Alarm | undefined = alarms.find((a)=>{return a.id.toString()==id});
    if(!itemInfo){
        return (<Text>Alarm Not Found</Text>);
    }
    return (
        <View>
            <Stack.Screen options={{title: "Details"}} />
            <Text>Alarm: {itemInfo.time} {itemInfo.meridiem}, ID: {itemInfo.id}</Text>
        </View>
        
    );
}