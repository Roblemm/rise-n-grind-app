import { RepeatDay } from "@/types";
import uuid from 'react-native-uuid';


export class AlarmClass {
    id: string;
    active: boolean;
    hour: number;
    minute: number;
    repeat: RepeatDay[];

    constructor(hour: number, minute: number, active: boolean = true, repeat: RepeatDay[] = ["None"]) {
        let id = uuid.v4();
        if(typeof(id) !== 'string') {
            id = "00000000-0000-0000-0";
        }

        this.id = id
        this.active = active;
        this.hour = hour;
        this.minute = minute;
        this.repeat = repeat;
    }

    get12HourTime(): string {
        let hour = this.hour;
        if(hour > 12) {
            hour -= 12;
        }
        if(hour === 0) {
            hour = 12;
        }
        return `${hour}:${this.minute < 10? "0" : ""}${this.minute} ${this.hour >= 12? "PM" : "AM"}`;
    }


    toJSON(): any {
        return {
            id: this.id,
            active: this.active,
            hour: this.hour,
            minute: this.minute,
            repeat: this.repeat,
        }
        
    }

    static fromJSON(json: any): AlarmClass {
        return new AlarmClass(json.hour, json.minute, json.active, json.repeat);
    }


    static convertAlarmsToJSON(alarms: AlarmClass[]): any[] {
        let alarmsJSON: any[] = [];
        alarms.forEach(alarm => {
            alarmsJSON.push(alarm.toJSON());
        });
        return alarmsJSON;
    }

    static convertAlarmsFromJSON(alarmsJSON: any[]): AlarmClass[] {
        let alarms: AlarmClass[] = [];
        alarmsJSON.forEach(alarmJSON => {
            alarms.push(AlarmClass.fromJSON(alarmJSON));
        });
        return alarms;
    }
}