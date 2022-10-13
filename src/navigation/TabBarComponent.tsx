import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Home_Inactive from '../assets/svg/home-inactive.svg';
import Add_Inactive from '../assets/svg/add-inactive.svg';
import Add_Active from '../assets/svg/add-active.svg';
import Storage_Inactive from '../assets/svg/storage-inactive.svg';
import {heightPercentage, widthPercentage, fontSz} from '../config';
import COLORS from '../color';

const iconsObj = {
  Home: {
    inActive: (
      <Home_Inactive
        height={heightPercentage(31)}
        width={widthPercentage(33)}
      />
    ),
    isActive: (
      <Home_Inactive
        height={heightPercentage(31)}
        width={widthPercentage(33)}
      />
    ),
  },
  Add: {
    inActive: (
      <Add_Inactive height={heightPercentage(31)} width={widthPercentage(33)} />
    ),
    isActive: (
      <Add_Active height={heightPercentage(31)} width={widthPercentage(33)} />
    ),
  },
  Storage: {
    inActive: (
      <Storage_Inactive
        height={heightPercentage(31)}
        width={widthPercentage(33)}
      />
    ),
    isActive: (
      <Storage_Inactive
        height={heightPercentage(31)}
        width={widthPercentage(33)}
      />
    ),
  },
};

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBarComponent: React.FC<Props> = ({state, descriptors, navigation}) => {
  return (
    <SafeAreaView style={styles.tabBar}>
      {state.routes.map((route: any, index: string) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icons = iconsObj[label];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}>
            <View>{isFocused ? icons.isActive : icons.inActive}</View>
            <Text
              style={
                (styles.tabLabel,
                {color: isFocused ? COLORS.primary : COLORS.gray})
              }>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: heightPercentage(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderColor: COLORS.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(16),
  },
  tabLabel: {
    fontWeight: '500',
    fontSize: fontSz(15),
  },
});

export default TabBarComponent;
