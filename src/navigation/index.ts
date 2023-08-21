import { RouteConfigComponent } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import AppNavigator from './app-navigator';
import { TPickerModalScreen } from '@components/modals';
import BottomTabNavigator from './bottom-tab-navigator';
import { useRightNavigationHeader } from './hooks';
import HeaderIcon from './components/header-icon';
import { TYogaPracticeDetailsScreen } from '../screens/yoga-practice/yoga-practice-details/yoga-practice-details-screen';

type TScreenList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  YogaPracticesScreen: undefined;
  YogaLessonsScreen: undefined;
  MeditationPracticesScreen: undefined;
  AllYogaPracticesScreen: undefined;
  YogaPracticeDetailsScreen: TYogaPracticeDetailsScreen;
  // UserDetailScreen: {
  //   user: 'self' | 'other';
  //   userId: string;
  // };
};

type TRootStackParamList = {
  BottomTabNavigator: undefined;
  PickerModalScreen: TPickerModalScreen;
} & TScreenList;

type TRouteName = keyof TRootStackParamList;

type TStackNavigation = StackNavigationProp<TRootStackParamList, TRouteName>;

type TRouteConfigComponent = RouteConfigComponent<
  TRootStackParamList,
  TRouteName
>;

type TRouteComponent = Required<Pick<TRouteConfigComponent, 'component'>>;

type TNavigationItem = TRouteComponent & {
  tabName: string;
  screenName: TRouteName;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootStackParamList {}
  }
}

export {
  AppNavigator,
  BottomTabNavigator,
  useRightNavigationHeader,
  HeaderIcon,
};
export type {
  TRootStackParamList,
  TRouteName,
  TStackNavigation,
  TRouteConfigComponent,
  TRouteComponent,
  TNavigationItem,
};
