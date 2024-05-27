import { AlarmClass } from "@/utils/AlarmClass";

const timeInTwo = new Date(new Date().getTime() + 60*1000*2);

export const alarms: AlarmClass[] = [
    new AlarmClass(timeInTwo.getHours(), timeInTwo.getMinutes())
  ]