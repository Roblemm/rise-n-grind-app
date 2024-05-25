import { FlatList, Pressable, StyleSheet } from 'react-native';

import { alarms } from '@assets/Alarms';
import AlarmItem from '@/components/AlarmItem';




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
