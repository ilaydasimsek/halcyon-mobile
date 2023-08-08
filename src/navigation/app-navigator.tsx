import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { colors } from '@style';
import { icons } from '@constants';
import { PickerModalScreen } from '@components/modals';
import { BottomTabNavigator, TRootStackParamList } from '@navigation';
import { RootState } from '../common/store';
import HeaderIcon from './components/header-icon';
import LoginScreen from '../screens/auth/login/login-screen';
import WelcomeScreen from '../screens/auth/welcome/welcome-screen';
import RegisterScreen from '../screens/auth/register/register-screen';

const Stack = createStackNavigator<TRootStackParamList>();

const AppNavigator: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const headerIcon = useMemo(() => <HeaderIcon source={icons.back} />, []);
  if (loggedIn === undefined) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  }

  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerBackTitleVisible: false,
        headerBackImage: () => headerIcon,
        headerTintColor: colors.black,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        detachPreviousScreen: false,
        title: '',
        headerLeftContainerStyle: styles.headerLeftContainer,
        headerRightContainerStyle: styles.headerRightContainer,
      }}
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
            options={{
              ...TransitionPresets.ModalFadeTransition,
              headerShown: false,
              cardOverlayEnabled: true,
              presentation: 'transparentModal',
            }}
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
              animationEnabled: true,
            }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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
  headerRightContainer: { paddingRight: 25 },
  headerLeftContainer: { paddingLeft: 25 },
});

export default AppNavigator;
