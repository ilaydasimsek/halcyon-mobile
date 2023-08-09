import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TNavigationItem, TRootStackParamList, TRouteName } from './index';
import { icons } from '@constants';
import TabBarIconImage from './components/tab-bar-icon-image';
import ProfileScreen from '../screens/profile/profile-screen';
import HomeScreen from '../screens/home/home-screen';

const Tab = createBottomTabNavigator<TRootStackParamList>();

type TBottomNavigationItem = TNavigationItem & {
  icon: ImageSourcePropType;
  focusedIcon: ImageSourcePropType;
};
const BOTTOM_TABS: TBottomNavigationItem[] = [
  {
    tabName: 'Home',
    screenName: 'HomeScreen',
    component: HomeScreen,
    icon: icons.home,
    focusedIcon: icons.homeSelected,
  },
  {
    tabName: 'Profile',
    screenName: 'ProfileScreen',
    component: ProfileScreen,
    icon: icons.profile,
    focusedIcon: icons.profileSelected,
  },
];

type TTabBarIcon = {
  routeName: TRouteName;
};

const getTabBarIcon = ({ routeName }: TTabBarIcon) => {
  return ({ focused }: { focused: boolean }) => {
    const tabBarItem = BOTTOM_TABS.find((object) => {
      return object.screenName === routeName;
    });
    if (tabBarItem !== undefined) {
      return (
        <TabBarIconImage
          icon={focused ? tabBarItem.focusedIcon : tabBarItem.icon}
        />
      );
    }
  };
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: getTabBarIcon({ routeName: route.name }),
        headerTitleAlign: 'center',
      })}
    >
      {BOTTOM_TABS.map((tabBarItem) => (
        <Tab.Screen
          name={tabBarItem.screenName}
          key={tabBarItem.screenName}
          component={tabBarItem.component}
          options={{ tabBarShowLabel: false, headerShown: false, lazy: true }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
