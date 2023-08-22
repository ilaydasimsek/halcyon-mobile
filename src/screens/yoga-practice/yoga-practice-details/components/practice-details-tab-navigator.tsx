import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TRootStackParamList, TNavigationItem } from '@navigation';
import { colors } from '@style';
import OverviewScreen from './overview-screen';
import BenefitsScreen from './benefits-screen';
import ProgramScreen from './program-screen';

const Tab = createMaterialTopTabNavigator<TRootStackParamList>();

const tabs: TNavigationItem[] = [
  {
    tabName: 'Overview',
    screenName: 'OverviewScreen',
    component: OverviewScreen,
  },
  {
    tabName: 'Benefits',
    screenName: 'BenefitsScreen',
    component: BenefitsScreen,
  },
  {
    tabName: 'Program',
    screenName: 'ProgramScreen',
    component: ProgramScreen,
  },
];

const PracticeDetailsTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.darkPink,
        tabBarInactiveTintColor: colors.textGrayH2,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.screenName}
          name={tab.screenName}
          component={tab.component}
          options={{
            title: tab.tabName,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIndicatorStyle: {
    backgroundColor: colors.darkPink,
  },
  tabBarItemStyle: {
    paddingBottom: 0,
    paddingHorizontal: 12,
  },
  tabBarLabelStyle: { textTransform: 'capitalize' },
  tabBarStyle: {
    backgroundColor: colors.backgroundGray,
    marginHorizontal: 12,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default PracticeDetailsTabNavigator;
