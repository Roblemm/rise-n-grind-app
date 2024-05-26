import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { AlarmItem as AlarmItemType } from '@/types';

type AlarmItemProps = {
    alarm: AlarmItemType;
}

export default function AlarmItem({ alarm } : AlarmItemProps) {
    return (
    <Link href={`/alarms/${alarm.id}`} asChild>
        <Pressable style={styles.alarmItem}>
            <Text>{alarm.time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })}</Text>
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