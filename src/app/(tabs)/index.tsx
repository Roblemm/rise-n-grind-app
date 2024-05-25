import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const AlarmItem = () => {
  return (<Pressable style={styles.alarmItem}>
    <Text>!</Text>
</Pressable>)
} 


export default function AlarmsScreen() {
  return (
    <View style={styles.container}>
      <AlarmItem/>
      <AlarmItem/>
      <AlarmItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  alarmItem: {
    height: 50,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#66C3FF",
  }
});
