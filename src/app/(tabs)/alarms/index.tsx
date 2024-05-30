import { FlatList, Pressable, StyleSheet } from 'react-native';

import AlarmItem from '@/components/AlarmItem';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAlarmList } from '@/providers/AlarmListProvider';
import db from '@react-native-firebase/database';
import { useEffect } from 'react';
import { useLogin } from '@/providers/LoginProvider';
import { AlarmClass } from '@/utils/AlarmClass';
import Colors from '@/constants/Colors';


/*
TODO:

x Delete Alarm
x Make Toggle Work
x Edit Alarm
x Add Splashscreen

o Add Alert on Phone when Alarm goes off & Toggle if One Time Alarm
~ Add Next Alarm in (time)



x Clean up Add Alarm Page
  o Add Selecting Ringtone
  x Make Default Repeat Everyday
  x Make Cases for if its Weekdays or Everyday
  o Add Repeats?

Do something cool.
- Edit Volume from Phone
- Add Missions
- Add Journal



*/
export default function AlarmsScreen() {
  const { items } = useAlarmList();
  const { getLoggedIn, getUser } = useLogin();


  console.log("Attaching UseEffect to Main Page");
  useEffect(() => {
    const addAlarmToFirebase = async () => {
      try {
        const user = getUser();

        console.log("User: " + user)
        console.log("Logged In: " + getLoggedIn())

        if (getLoggedIn() && user) {
          const userRef = db().ref(`users/${user.uid}`);
          const snapshot = await userRef.once("value");
          if (snapshot.exists()) {
            // User does not exist, create user info
            await userRef.set({
              curTime: new Date().getTime(),
              alarms: AlarmClass.convertAlarmsToJSON(items),
            });
          }

        }
      } catch (e) {
        console.log(e);
      }
    };

    console.log("Alarms Changed, Updating");
    console.log(items);
    addAlarmToFirebase();
  }, [items]); // Add items as a dependency

  return (
    <View style={styles.container}>
      {/* {
        items.length !== 0 &&
        <Text style={styles.nextAlarmInText}>Next Alarm in {AlarmClass.timeUntilNextAlarm(items)}</Text>
      } */}

      <FlatList style={[styles.container, styles.alarmList]}
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
  nextAlarmInText: {

  },

  container: {
    flex: 1,
  },
  alarmList: {
    marginTop: 10,
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
  }
});
