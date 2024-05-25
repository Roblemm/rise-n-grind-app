import { FlatList, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AlarmItem from '@/components/AlarmItem';

const alarms = [
  { time: "7:30", meridiem: 'AM', id: 1 },
  { time: "3:30", meridiem: 'PM', id: 2 },
  { time: "8:45", meridiem: 'PM', id: 3 },
]


export default function AlarmsScreen() {
  return (
      <FlatList style={styles.container}
        data={alarms}
        renderItem={({ item }) => {
          return (<AlarmItem alarm={item} />)
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
