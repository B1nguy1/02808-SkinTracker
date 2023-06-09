import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenStackParamList } from "../navigations";
import { HomeNavigationParamList } from "../navigations/HomeNavigation";
import { RecordingNavigationParamList } from "../navigations/RecordingNavigation";
import { UserNavigationParamList } from "../navigations/UserNavigation";

export type LoginNavigationProp = StackNavigationProp<ScreenStackParamList, "Root">;
export type HomeNavigationProp = StackNavigationProp<HomeNavigationParamList>;
export type RecordingNavigationProp = StackNavigationProp<RecordingNavigationParamList>;
export type UserNavigationProp = StackNavigationProp<UserNavigationParamList>;