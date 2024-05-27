import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAlarmList } from '@/providers/AlarmListProvider';
import { AlarmItem } from '@/types';

import auth from "@react-native-firebase/auth";
import db from '@react-native-firebase/database';

const addAlarm = () => {
    const router = useRouter();


    const [alarmTime, setAlarmTime] = useState(new Date(new Date().getTime() + 60000));
    const { items, addItem } = useAlarmList();
    const [showTimePicker, setShowTimePicker] = useState(false);


    const addAlarm = async () => {
        try {
            const response = await auth().signInWithEmailAndPassword("testuser@risengrind.com", "grinditout");
            // Create user info if user does not exist
            const userRef = db().ref(`users/${response.user.uid}`);
            const snapshot = await userRef.once("value");
            if (snapshot.exists()) {
                // User does not exist, create user info
                await userRef.set({
                    curTime: new Date().getTime(),
                    alarms: items,
                });
            }

        } catch (e) {
            console.log(e);
        }
    }


    const addAlarmToList = () => {
        const alarmItem: AlarmItem = {
            id: items.length + 1,
            time: alarmTime,
            active: true
        }

        addItem(alarmItem);

        addAlarm();

        router.push("/alarms");
    };

    const showTimePickerModal = () => {
        setShowTimePicker(true);
    };

    const hideTimePickerModal = () => {
        setShowTimePicker(false);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        hideTimePickerModal();
        if (selectedTime) {
            setAlarmTime(selectedTime);
        }
    };


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Create New Alarm" }} />

            <View style={styles.clockContainer}>
                <Text style={styles.clockText}>
                    {alarmTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
                <Pressable onPress={showTimePickerModal}>
                    <FontAwesome5 name="edit" size={30} color="#2c3e50" />
                </Pressable>
            </View>
            <Pressable style={styles.addButton} onPress={addAlarmToList}>
                <MaterialCommunityIcons name="check" size={50} color="white" />
            </Pressable>

            {showTimePicker && (
                <DateTimePicker
                    value={alarmTime}
                    mode="time"
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}


        </View>
    );
}

export default addAlarm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    clockContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    clockText: {
        fontSize: 50,
        marginRight: 10,
        color: "#2c3e50", // Set your desired text color
    },
    addButton: {
        backgroundColor: 'lime',
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
    // title: {
    //     fontWeight: '900',
    //     fontSize: 40,
    // },



})