import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from "@/components/Themed";
import { useAlarmList } from "@/providers/AlarmListProvider";
import { AlarmClass } from "@/utils/AlarmClass";
import { Stack, router, useLocalSearchParams } from "expo-router";
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import db from '@react-native-firebase/database';
import { useLogin } from '@/providers/LoginProvider';


export default function AlarmPage() {
    const { id } = useLocalSearchParams();
    const { items, removeItem } = useAlarmList();
    const { getLoggedIn, getUser } = useLogin();

    if (!id) {
        return (
            <View>
                <Stack.Screen options={{ title: "Edit Alarm" }} />
                <Text>No Alarm Id</Text>
            </View>
        );
    }

    const alarm: AlarmClass | undefined = items.find((a) => { return a.id.toString() == id });
    if (!alarm) {
        return (
            <View>
                <Stack.Screen options={{ title: "Edit Alarm" }} />
                <Text>Alarm Not Found</Text>
            </View>
        );
    }

    async function deleteAlarm() {
        try {
            const user = getUser();

            if (getLoggedIn() && user) {
                // Get Index of Alarm
                const index = items.findIndex((a) => { return a.id.toString() == id });


                const ref = db().ref(`users/${user.uid}/alarms`);
                const snapshot = await ref.once("value");
                if (snapshot.exists()) {
                    // Remove Alarm
                    ref.child(index.toString()).remove();
                    
                    if(alarm){
                        removeItem(alarm.id)
                    }

                    //Reroute back to the main page
                    router.back();
                }

            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.expand}>
            <Stack.Screen options={{ title: "Edit Alarm" }} />
            <View style={styles.container}>
                <Text style={styles.alarmText}>{alarm.get12HourTime()}</Text>
                <Text style={styles.alarmRepeatsText}>{alarm.getAlarmRepeats()}</Text>

                {/* Delete Button */}
                <Pressable style={styles.deleteButton} onPress={deleteAlarm}>
                    <Ionicons name="trash-outline" size={50} color="white" />
                </Pressable>

                {/* Edit Time Button */}
                {/* Edit Repeats Button */}
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    expand: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#66C3FF",
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    alarmRepeatsText: {
        fontSize: 10,
        fontWeight: "bold",
        alignSelf: "center",
        color: Colors.light.background,
    },
    alarmText: {
        fontSize: 50,
        fontWeight: "bold",
        color: Colors.light.background2,
        alignSelf: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        borderRadius: 75 / 2,
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 10,
        position: "absolute",
        bottom: 0,
        right: 0,
    }
});