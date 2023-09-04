import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { icons } from '@constants';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import MainPracticeScreen from '../../yoga-practice/main-practice-screen/main-practice-screen';
import MeditationPracticesScreen from '../../meditation-practices/meditation-practices-screen';
import YogaLessonsScreen from '../../yoga-lessons/yoga-lessons-screen';
import { TRootStackParamList, TNavigationItem } from '@navigation';
import TopTabNavigationItem from './components/top-tab-navigation-item';
import { colors } from '@style';

const Tab = createMaterialTopTabNavigator<TRootStackParamList>();

type TTopNavigationItem = TNavigationItem & {
  icon: ImageSourcePropType;
};

const homeScreenTabs: TTopNavigationItem[] = [
  {
    tabName: 'Yoga',
    screenName: 'YogaPracticesScreen',
    icon: icons.yogaHeader,
    component: MainPracticeScreen,
  },
  {
    tabName: 'Meditation',
    screenName: 'MeditationPracticesScreen',
    icon: icons.meditationHeader,
    component: MeditationPracticesScreen,
  },
  {
    tabName: 'Lessons',
    screenName: 'YogaLessonsScreen',
    icon: icons.lessonsHeader,
    component: YogaLessonsScreen,
  },
];

function HomeScreenTabBar({ state, navigation }: MaterialTopTabBarProps) {
  return (
    <View>
      <ScrollView
        horizontal
        style={styles.header}
        showsHorizontalScrollIndicator={false}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: {},
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={homeScreenTabs[index].tabName}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <TopTabNavigationItem
                selected={isFocused}
                icon={homeScreenTabs[index].icon}
                title={homeScreenTabs[index].tabName}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const HomeScreenTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <HomeScreenTabBar {...props} />}>
      {homeScreenTabs.map((tab) => (
        <Tab.Screen
          key={tab.screenName}
          name={tab.screenName}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGray,
  },
});

export default HomeScreenTabNavigator;
