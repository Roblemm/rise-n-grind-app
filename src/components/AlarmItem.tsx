import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { AlarmClass } from '@/utils/AlarmClass';

type AlarmItemProps = {
    alarm: AlarmClass;
}

export default function AlarmItem({ alarm } : AlarmItemProps) {
    return (
    <Link href={`/alarms/${alarm.id}`} asChild>
        <Pressable style={styles.alarmItem}>
            <Text>{alarm.get12HourTime()}</Text>
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
        flexDirection: "column",
        backgroundColor: "#66C3FF",
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    }
});