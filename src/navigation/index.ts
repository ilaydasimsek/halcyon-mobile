import { RouteConfigComponent } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import AppNavigator from './app-navigator';
import { TPickerModalScreen } from '@components/modals';
import BottomTabNavigator from './bottom-tab-navigator';
import { useRightNavigationHeader } from './hooks';
import HeaderIcon from './components/header-icon';
import { TYogaPracticeDetailsScreen } from '../screens/yoga/yoga-practices/yoga-practice-details/yoga-practice-details-screen';
import { TYogaPracticeResponse } from '../screens/yoga/yoga-practices/yoga-practice-query';
import { TYogaChallengeDetailsScreen } from '../screens/yoga/yoga-challenges/yoga-challenge-details/yoga-challenge-details-screen';
import { TYogaLessonDetailsScreen } from '../screens/yoga-lessons/yoga-lesson-details-screen/yoga-lesson-details-screen';
import { TLessonArticleScreen } from '../screens/articles/lesson-article-screen/lesson-article-screen.tsx';
import { TSingleArticleScreen } from '../screens/articles/single-article-screen/single-article-screen.tsx';

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
  YogaChallengeDetailsScreen: TYogaChallengeDetailsScreen;
  BenefitsScreen: {
    yogaPractice: TYogaPracticeResponse;
  };
  OverviewScreen: {
    yogaPractice: TYogaPracticeResponse;
  };
  ProgramScreen: {
    yogaPractice: TYogaPracticeResponse;
  };
  YogaPracticeScreen: {
    yogaPractice: TYogaPracticeResponse;
    challengeId?: string;
  };
  YogaChallengesScreen: undefined;
  PracticeCompletionScreen: undefined;
  YogaLessonDetailsScreen: TYogaLessonDetailsScreen;
  LessonArticleScreen: TLessonArticleScreen;
  SingleArticleScreen: TSingleArticleScreen;
  AllArticlesScreen: undefined;
  SettingsScreen: undefined;
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
