import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAlarmList } from '@/providers/AlarmListProvider';

import { AlarmClass } from '@/utils/AlarmClass';
import { globalStyles } from '@/components/Styles';
import Colors from '@/constants/Colors';

const addAlarm = () => {
    const router = useRouter();


    const [alarmTime, setAlarmTime] = useState(new Date(new Date().getTime() + 60000));
    const { addItem } = useAlarmList();
    const [showTimePicker, setShowTimePicker] = useState(false);


    const addAlarmToList = () => {
        const alarmItem: AlarmClass = new AlarmClass(alarmTime.getHours(), alarmTime.getMinutes());

        addItem(alarmItem);

        router.back();
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
        <View style={styles.expand}>
            <View style={styles.container}>
                <Stack.Screen options={{ title: "Create New Alarm" }} />

                <View style={styles.clockContainer}>
                    <Text style={styles.clockText}>
                        {alarmTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    <Pressable style={styles.editButton} onPress={showTimePickerModal}>
                        <Feather name="edit-2" size={30} color="white" />
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
        </View>
    );
}

export default addAlarm

const styles = StyleSheet.create({
    expand: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    clockContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#66C3FF",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    clockText: {
        fontSize: 50,
        fontWeight: "bold",
        color: Colors.light.background2,
        alignSelf: "center",
        marginRight: 20,
    },
    addButton: {
        backgroundColor: Colors.light.foreground,
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
    // title: {
    //     fontWeight: '900',
    //     fontSize: 40,
    // },



})
