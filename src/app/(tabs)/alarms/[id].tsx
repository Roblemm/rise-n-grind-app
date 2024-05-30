import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from "@/components/Themed";
import { useAlarmList } from "@/providers/AlarmListProvider";
import { AlarmClass } from "@/utils/AlarmClass";
import { Stack, router, useLocalSearchParams } from "expo-router";
import Colors from '@/constants/Colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";

import db from '@react-native-firebase/database';
import { useLogin } from '@/providers/LoginProvider';
import { useState } from 'react';


export default function AlarmPage() {
    const { id } = useLocalSearchParams();
    const { items, removeItem, editItem } = useAlarmList();
    const { getLoggedIn, getUser } = useLogin();
    const [showTimePicker, setShowTimePicker] = useState(false);


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
        if (alarm) {
            removeItem(alarm.id);
        }
        // Reroute back to the main page
        router.back();

        // try {
        //     const user = getUser();

        //     if (getLoggedIn() && user) {
        //         // Get Index of Alarm
        //         const index = items.findIndex((a) => { return a.id.toString() == id });


        //         const ref = db().ref(`users/${user.uid}/alarms`);
        //         const snapshot = await ref.once("value");
        //         if (snapshot.exists()) {
        //             // Remove Alarm
        //             ref.child(index.toString()).remove();

        //             if (alarm) {
        //                 removeItem(alarm.id)
        //             }

        //             //Reroute back to the main page
        //             router.back();
        //         }

        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    const showTimePickerModal = () => {
        setShowTimePicker(true);
    };

    const hideTimePickerModal = () => {
        setShowTimePicker(false);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        hideTimePickerModal();
        if (selectedTime) {
            // Update Alarm Time

            editItem(alarm.id, {
                hour: selectedTime.getHours(),
                minute: selectedTime.getMinutes(),
            })
        }
    };

    const now = new Date();

    return (
        <View style={styles.expand}>
            <Stack.Screen options={{ title: "Edit Alarm" }} />
            <View style={styles.container}>
                <View style={styles.clockContainer}>
                    <Text style={styles.alarmText}>{alarm.get12HourTime()}</Text>
                    <Pressable style={styles.editButton} onPress={showTimePickerModal}>
                        <Feather name="edit-2" size={30} color="white" />
                    </Pressable>
                </View>

                <Text style={styles.alarmRepeatsText}>{alarm.getAlarmRepeats()}</Text>

                {/* Delete Button */}
                <Pressable style={styles.deleteButton} onPress={deleteAlarm}>
                    <Ionicons name="trash-outline" size={50} color="white" />
                </Pressable>

                {/* Edit Time Button */}

                {showTimePicker && (
                    <DateTimePicker
                        value={new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarm.hour, alarm.minute, 0)}
                        mode="time"
                        display="spinner"
                        onChange={handleTimeChange}
                    />
                )}

                {/* Edit Repeats Button */}
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    expand: {
        flex: 1,
    },
    clockContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    container: {
        flex: 1,
        backgroundColor: "#66C3FF",
        padding: 10,
        margin: 10,
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
        marginRight: 20,
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
    },
    editButton: {
        backgroundColor: Colors.light.foreground2,
        borderRadius: 50 / 2,
        borderColor: Colors.light.foreground,
        borderWidth: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});