import { RepeatDay } from "@/types";
import uuid from 'react-native-uuid';


export class AlarmClass {
    id: string;
    active: boolean;
    hour: number;
    minute: number;
    repeat: RepeatDay[];

    constructor(hour: number, minute: number, active: boolean = true, repeat: RepeatDay[] = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",]) {
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

    getAlarmRepeats() : string {
        // Check if all days are selected
        if(this.repeat.length === 7 && !this.repeat.includes("None")) {
            return "Daily";
        }

        // Check if weekdays are selected
        if(this.repeat.length === 5 && !this.repeat.includes("None") && !this.repeat.includes("Sunday") && !this.repeat.includes("Saturday")) {
            return "Weekdays";
        }

        
        
        let repeats = "";
        this.repeat.forEach(repeat => {
            repeats += AlarmClass.dayToShort(repeat) + ", ";
        });
        repeats = repeats.slice(0, repeats.length - 2);
        return repeats;
    }

    static dayToShort(day: RepeatDay): string {
        switch(day) {
            case "Sunday":
                return "Sun";
            case "Saturday":
                return "Sat";
            case "Monday":
                return "Mon";
            case "Tuesday":
                return "Tue";
            case "Wednesday":
                return "Wed";
            case "Thursday":
                return "Thu";
            case "Friday":
                return "Fri";
            case "None":
                return "One Time";
        }
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