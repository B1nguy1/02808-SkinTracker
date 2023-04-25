import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenStackParamList } from "../navigations";
import { HomeNavigationParamList } from "../navigations/HomeNavigation";

export type LoginNavigationProp = StackNavigationProp<ScreenStackParamList, "Root">;
export type TestNavigationProp = StackNavigationProp<HomeNavigationParamList>;