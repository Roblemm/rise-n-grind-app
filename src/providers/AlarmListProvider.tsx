import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { alarms } from "@assets/Alarms";
import { AlarmClass } from "@/utils/AlarmClass";

type AlarmListType = {
    items: AlarmClass[],
    addItem: (item: AlarmClass) => void,
    setItemsList: (items: AlarmClass[]) => void,
    removeItem: (id: string) => void,
    // onEditItem: (id: string) => void,
    toggleItem: (id: string) => boolean,
}

export const AlarmListContext = createContext<AlarmListType>({
    items: [],
    addItem: () => { },
    setItemsList: () => { },
    removeItem: () => { },
    // onEditItem: () => { },
    toggleItem: () => { return true },
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

    const removeItem = (id: string) => {
        console.log("Running remove item!");
        setItems(items.filter(item => item.id!== id));
    }

    const toggleItem = (id: string) => {
        console.log("Running toggle item!");
        let active = true
        setItems(items.map(item => {
            if (item.id === id) {
                item.active =!item.active;
                active = item.active;
            }
            return item;
        }));
        return active
    }


    return (
        <AlarmListContext.Provider value={{ items, addItem, setItemsList, removeItem, toggleItem }}>
            {children}
        </AlarmListContext.Provider>
    );
};

export default AlarmListProvider

export const useAlarmList = () => useContext(AlarmListContext);