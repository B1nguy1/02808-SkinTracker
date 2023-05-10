import { Timestamp } from "firebase/firestore";

export interface IUserSkin {
    id: string;
    skinType:string;
}

export interface IUserProfile {
    id: string,
    type: string;
    description: string;
    onPress?: () => void;
    screenName?:string;
}

export interface ISkinArray {
    id: string,
    type: string,
    description: string;
}

export interface IHomeCard {
    id: string
    title: string;
    icon: string;
    screenName: string;    
};

export interface IRecordCard {
    rcId: number;
    rcTitle: string;
    rcIcon: string;
    onPress?: () => void;
}

// Dropdown interfaces

interface ISingleDropDown{
    key: string;
    value: string;
    disabled?: boolean;
}

export interface IDropDown{
    data: ISingleDropDown[];
    placeholder: string;
    setSelected: (val: string) => void;
}

export interface IActivityData {
    activity_date: Timestamp;
    activity_calories: number;
}

export interface IActivityModal {
  setVisible: () => void;
  visible: boolean;
  activityHour: number;
  setActivityHour: (hour:number) => void;
  activityDate: Date;
  handleDateChange: (event: any, selectedDate?: Date | undefined) => void;
  save: () => void;
}

export interface IHealthDataModal {
    setVisible: () => void;
    visible: boolean;
}