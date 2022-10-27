import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import SignupScreen from '../Screens/Signup';
import LoginScreen from '../Screens/Login';
import MainScreen from '../Screens/Main';

// Bottom Tab Screens
import HomeScreen from '../Screens/Home';
import GuideScreen from '../Screens/Guide';
import COLORS from '../color';
import BottomTabBar from './TabBarComponent';

import FoodsScreen from '../Screens/Foods';
import VerifyCode from '../Screens/ForgotPassword/VerifyCode';
import EnterEmail from '../Screens/ForgotPassword/EnterEmail';
import ResetPassword from '../Screens/ForgotPassword/ResetPassword';

import {useAppSelector, RootState} from '../features/store';
import OnboardingScreen from '../Screens/Onboarding';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeIndex" component={HomeScreen} />
      <Stack.Screen name="Foods" component={FoodsScreen} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Guide" component={GuideScreen} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  const {isAuthenticated, isOnboarded} = useAppSelector(
    (state: RootState) => state.auth,
  );
  // console.log('token', token);
  // console.log('isAuthenticated', isAuthenticated);
  // console.log('isOnboarded', isOnboarded);
  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={isOnboarded ? 'Main' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="EnterEmail" component={EnterEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
