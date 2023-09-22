import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { TransitionPresets } from '@react-navigation/stack';

import { colors } from '@style';
import { icons } from '@constants';
import { PickerModalScreen } from '@components/modals';
import { BottomTabNavigator, TRootStackParamList } from '@navigation';
import { RootState } from '../common/store';
import HeaderIcon from './components/header-icon';
import LoginScreen from '../screens/auth/login/login-screen';
import WelcomeScreen from '../screens/auth/welcome/welcome-screen';
import RegisterScreen from '../screens/auth/register/register-screen';
import AllYogaPracticesScreen from '../screens/yoga-practice/all-yoga-practices/all-yoga-practices-screen';
import YogaPracticeDetailsScreen from '../screens/yoga-practice/yoga-practice-details/yoga-practice-details-screen';
import YogaPracticeScreen from '../screens/yoga-practice/yoga-practice/yoga-practice-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import YogaChallengesScreen from '../screens/yoga-practice/yoga-challenges/yoga-challenges-screen';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppNavigator: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const headerIcon = useMemo(() => <HeaderIcon source={icons.back} />, []);
  if (loggedIn === undefined) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  }

  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_right',
        headerBackTitleVisible: false,
        headerTintColor: colors.textGray,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: (props) =>
          props.canGoBack && (
            <HeaderBackButton
              {...props}
              backImage={() => headerIcon}
              onPress={() => navigation.pop()}
            />
          ),
        headerStyle: {
          backgroundColor: colors.backgroundGray,
        },
      })}
    >
      {loggedIn ? (
        <>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickerModalScreen"
            component={PickerModalScreen}
            {...TransitionPresets.ModalFadeTransition}
          />
          <Stack.Screen
            name="AllYogaPracticesScreen"
            options={{ title: 'Practices' }}
            component={AllYogaPracticesScreen}
          />
          <Stack.Screen
            name="YogaPracticeDetailsScreen"
            options={{ title: 'Details' }}
            component={YogaPracticeDetailsScreen}
          />
          <Stack.Screen
            name="YogaPracticeScreen"
            options={{
              title: 'Yoga Practice',
              headerStyle: {
                backgroundColor: colors.white,
              },
            }}
            component={YogaPracticeScreen}
          />
          <Stack.Screen
            name="YogaChallengesScreen"
            options={{
              title: 'Yoga Challenges',
            }}
            component={YogaChallengesScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: loggedIn ? 'push' : 'pop',
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              title: 'Register',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AppNavigator;
