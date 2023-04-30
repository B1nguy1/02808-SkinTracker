import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenStackParamList } from "../navigations";
import { HomeNavigationParamList } from "../navigations/HomeNavigation";
import { RecordingNavigationParamList } from "../navigations/RecordingNavigation";

export type LoginNavigationProp = StackNavigationProp<ScreenStackParamList, "Root">;
export type TestNavigationProp = StackNavigationProp<HomeNavigationParamList>;
export type RecordingNavigationProp = StackNavigationProp<RecordingNavigationParamList>;