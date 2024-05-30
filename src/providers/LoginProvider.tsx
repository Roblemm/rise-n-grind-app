import { PropsWithChildren, createContext, useContext, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from '@react-native-firebase/database';
import { AlarmClass } from '@/utils/AlarmClass';
import { useAlarmList } from '@/providers/AlarmListProvider';

type LoginType = {
    getLoggedIn: () => boolean,
    getUser: () => FirebaseAuthTypes.User | null,
}

export const LoginContext = createContext<LoginType>({
    getLoggedIn: () => { return false },
    getUser: () => { return null },
});

const LoginProvider = ({ children }: PropsWithChildren) => {
    const { items, setItemsList } = useAlarmList();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const getLoggedIn = () => {
        return isLoggedIn;
    }

    const getUser = () => {
        return user;
    }

    const login = async () => {
        try {
            if (isLoggedIn) {
                console.log("Already logged in!");
                return;
            }
            const response = await auth().signInWithEmailAndPassword("testuser@risengrind.com", "grinditout");
            if (response.user) {
                setIsLoggedIn(true);
                setUser(response.user);
            }
            // Create user info if user does not exist
            const userRef = db().ref(`users/${response.user.uid}`);
            const snapshot = await userRef.once("value");
            if (!snapshot.exists()) {
                // User does not exist, create user info
                await userRef.set({
                    curTime: new Date().getTime(),
                    alarms: AlarmClass.convertAlarmsToJSON(items),
                });
            } else {
                if (snapshot.val().alarms) {
                    console.log(AlarmClass.convertAlarmsFromJSON(snapshot.val().alarms));
                    setItemsList(AlarmClass.convertAlarmsFromJSON(snapshot.val().alarms));
                } else {
                    userRef.update({
                        alarms: AlarmClass.convertAlarmsToJSON(items),
                    });
                }
            }

        } catch (e) {
            console.warn(e);
        }
    }

    login();

    return (
        <LoginContext.Provider value={{ getLoggedIn, getUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider

export const useLogin = () => useContext(LoginContext);