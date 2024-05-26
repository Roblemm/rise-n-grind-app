import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";

const addAlarm = () => {
    const [alarmTime, setAlarmTime] = useState(new Date());

    const [showTimePicker, setShowTimePicker] = useState(false);

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

    useEffect(() => {
        const checkAlarm = setInterval(() => {
            const currentTime = new Date();
            if (
                currentTime.getHours() === alarmTime.getHours() &&
                currentTime.getMinutes() === alarmTime.getMinutes()
            ) {
                // Matched the set alarm time, show an alert
                Alert.alert("Alarm", "It is time!");
                // Stop checking once the alert is shown
                clearInterval(checkAlarm);
            }
        }, 1000); // Check every second

        // Cleanup on component unmount
        return () => clearInterval(checkAlarm);

    }, [alarmTime]);


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
            </View>

            {showTimePicker && (
                <DateTimePicker
                    value={alarmTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}

            <Button
                title="Set Alarm"
                onPress={showTimePickerModal}
                color="#3498db"
            />

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
    // title: {
    //     fontWeight: '900',
    //     fontSize: 40,
    // },



})