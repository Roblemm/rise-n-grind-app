import { FlatList, Pressable, StyleSheet } from 'react-native';

import AlarmItem from '@/components/AlarmItem';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAlarmList } from '@/providers/AlarmListProvider';

import auth from "@react-native-firebase/auth";
import db from '@react-native-firebase/database';

export default function AlarmsScreen() {
  const { items } = useAlarmList();


  const login = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword("testuser@risengrind.com", "grinditout");
      // Create user info if user does not exist
      const userRef = db().ref(`users/${response.user.uid}`);
      const snapshot = await userRef.once("value");
      if (!snapshot.exists()) {
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

  login();


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
