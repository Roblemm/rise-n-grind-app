import { PropsWithChildren, createContext, useContext, useState } from "react";
import { alarms } from "@assets/Alarms";
import { AlarmItem } from "@/types";


type AlarmListType = {
    items: AlarmItem[],
    addItem: (item: AlarmItem) => void,
    // onRemoveItem: (id: string) => void,
    // onEditItem: (id: string) => void,
    // onToggleItem: (id: string) => void,
}

export const AlarmListContext = createContext<AlarmListType>({
    items: [],
    addItem: () => { },
    // onRemoveItem: () => { },
    // onEditItem: () => { },
    // onToggleItem: () => { },
});

const AlarmListProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<AlarmItem[]>(alarms);

    const addItem = (item: AlarmItem) => {
        setItems([item, ...items]);
    };
    return (
        <AlarmListContext.Provider value={{items, addItem}}>
            {children}
        </AlarmListContext.Provider>
    );
};

export default AlarmListProvider

export const useAlarmList = () => useContext(AlarmListContext);