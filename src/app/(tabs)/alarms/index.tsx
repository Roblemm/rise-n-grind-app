import { FlatList, Pressable, StyleSheet } from 'react-native';

import { alarms } from '@assets/Alarms';
import AlarmItem from '@/components/AlarmItem';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAlarmList } from '@/providers/AlarmListProvider';


export default function AlarmsScreen() {
  const { items } = useAlarmList();

  return (
    <View style={styles.container}>
      <FlatList style={styles.container}
        data={items}
        renderItem={({ item }) => {
          return (<AlarmItem alarm={item} />)
        }}
      />
      <Link href={'/alarms/addAlarm'} asChild>
        <Pressable style={styles.addButton}>
          <MaterialCommunityIcons name="clock-plus-outline" size={50} color="white" />
        </Pressable>
      </Link>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alarmList: {
    flex: 1
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
});
