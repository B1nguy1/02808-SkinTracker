export interface IUserSkin {
    id: string;
    skinType:string;
}

export interface IUserProfile {
    id: string,
    type: string;
    description: string;
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
    setSelected: (val: string) => void;
}

