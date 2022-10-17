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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
