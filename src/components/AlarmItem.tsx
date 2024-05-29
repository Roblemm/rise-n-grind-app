import { Pressable, StyleSheet, Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { AlarmClass } from '@/utils/AlarmClass';
import { useState } from 'react';
import Colors from '@/constants/Colors';

import { useAlarmList } from "@/providers/AlarmListProvider";


type AlarmItemProps = {
    alarm: AlarmClass;
}

export default function AlarmItem({ alarm }: AlarmItemProps) {
    const { toggleItem } = useAlarmList();
    const [isEnabled, setIsEnabled] = useState(alarm.active);;

    const toggleSwitch = () => {
        const active = toggleItem(alarm.id);
        setIsEnabled(active);
        // Handle the toggle logic here, like updating the state in your backend or context
    };

    return (
        <Link href={`/alarms/${alarm.id}`} asChild>
            <Pressable
                style={styles.alarmItem}
                onPressIn={(e) => e.stopPropagation()}
                onPressOut={(e) => e.stopPropagation()}
            >
                <View style={styles.alarmContainer}>
                    <Text style={[styles.alarmRepeatsText, isEnabled ? {} : styles.alarmRepeatsTextToggled]}>{alarm.getAlarmRepeats()}</Text>
                    <Text style={[styles.alarmText, isEnabled ? {} : styles.alarmTextToggled]}>{alarm.get12HourTime()}</Text>
                </View>
                <View style={[styles.switchContainer]}>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#767577", true: null }}
                        thumbColor={isEnabled ? Colors.light.foreground : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>



            </Pressable>
        </Link>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    alarmItem: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#66C3FF",
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    alarmRepeatsText: {
        fontSize: 10,
        fontWeight: "bold",
        color: Colors.light.background,
    },
    alarmRepeatsTextToggled: {
        color: Colors.light.deselected,
    },
    alarmText: {
        fontSize: 50,
        fontWeight: "bold",
        color: Colors.light.background2,
    },
    alarmTextToggled: {
        textDecorationLine: "line-through",
        color: Colors.light.deselected,
    },

    alarmContainer: {
        height: "100%",
        flex: 3,
        backgroundColor: "transparent",
    },
    switchContainer: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: "transparent",
        overflow: "visible",
    },
    switch: {
        alignSelf: "flex-end",
        marginRight: 30,
        transform: [{ scale: 2 }],

    },

});