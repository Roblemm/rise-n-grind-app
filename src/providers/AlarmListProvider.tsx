import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { alarms } from "@assets/Alarms";
import { AlarmClass } from "@/utils/AlarmClass";

type AlarmListType = {
    items: AlarmClass[],
    addItem: (item: AlarmClass) => void,
    setItemsList: (items: AlarmClass[]) => void,
    // onRemoveItem: (id: string) => void,
    // onEditItem: (id: string) => void,
    // onToggleItem: (id: string) => void,
}

export const AlarmListContext = createContext<AlarmListType>({
    items: [],
    addItem: () => { },
    setItemsList: () => { },
    // onRemoveItem: () => { },
    // onEditItem: () => { },
    // onToggleItem: () => { },
});

const AlarmListProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<AlarmClass[]>([]);


    const addItem = (item: AlarmClass) => {
        console.log("Running add items!");
        setItems([item, ...items]);
    };

    const setItemsList = (items: AlarmClass[]) => {
        console.log("Running set items list!");
        setItems(items);
    };


    return (
        <AlarmListContext.Provider value={{ items, addItem, setItemsList }}>
            {children}
        </AlarmListContext.Provider>
    );
};

export default AlarmListProvider

export const useAlarmList = () => useContext(AlarmListContext);