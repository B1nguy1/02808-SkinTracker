import { Timestamp } from "firebase/firestore";
import React from "react";

interface IActivityData {
    activity_date: Timestamp;
    activity_calories: number;
}

const ActivityOverview = () => {

    const [activityData, setActivityData] = React.useState<Array<IActivityData>>([]);
    

}

export default ActivityOverview;