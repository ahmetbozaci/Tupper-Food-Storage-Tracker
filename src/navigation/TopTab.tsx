import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import COLORS from '../color';
import {fontSz} from '../config';

const Tab = createMaterialTopTabNavigator();

// screens
import AllScreen from '../Screens/Foods/All';
import FridgeScreen from '../Screens/Foods/Fridge';
import FreezerScreen from '../Screens/Foods/Freezer';
import Pantryscreen from '../Screens/Foods/Pantry';

const TopTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.blue,
        },
      }}>
      <Tab.Screen name="All" component={AllScreen} />
      <Tab.Screen name="Fridge" component={FridgeScreen} />
      <Tab.Screen name="Pantry" component={Pantryscreen} />
      <Tab.Screen name="Freezer" component={FreezerScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: 'capitalize',
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default TopTab;
