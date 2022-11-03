import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import Home_Inactive from '../../assets/svg/home-inactive.svg';
import Add_Inactive from '../../assets/svg/add-inactive.svg';
import Add_Active from '../../assets/svg/add-active.svg';
import Guide_Inactive from '../../assets/svg/guide-inactive.svg';
import {heightPercentage, widthPercentage, fontSz} from '../config';
import COLORS from '../color';
import AddModal from '../Screens/Add';

const iconsObj = {
  Home: {
    inActive: (
      <Home_Inactive
        height={heightPercentage(30)}
        width={widthPercentage(30)}
      />
    ),
    isActive: (
      <Home_Inactive
        height={heightPercentage(30)}
        width={widthPercentage(30)}
      />
    ),
  },
  Add: {
    inActive: (
      <Add_Inactive height={heightPercentage(30)} width={widthPercentage(30)} />
    ),
    isActive: (
      <Add_Active height={heightPercentage(30)} width={widthPercentage(30)} />
    ),
  },
  Guide: {
    inActive: (
      <Guide_Inactive
        height={heightPercentage(30)}
        width={widthPercentage(30)}
      />
    ),
    isActive: (
      <Guide_Inactive
        height={heightPercentage(30)}
        width={widthPercentage(30)}
      />
    ),
  },
};

interface TabBarComponentProps {
  state: any;
  descriptors: any;
  navigation: any;
}

interface TabButtonProps {
  isFocused: boolean;
  descriptors: any;
  navigation: any;
  route: any;
}

const TabBarComponent: React.FC<TabBarComponentProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [visible, setModalVisible] = useState(false);
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const routes = state.routes;

  return (
    <>
      <SafeAreaView style={[styles.tabBar]}>
        <TabButton
          navigation={navigation}
          route={routes[0]}
          isFocused={state.index === 0}
          descriptors={descriptors}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}>
          <Add_Active width={25} height={25} />
          <Text
            style={[
              styles.tabLabel,
              {color: visible ? COLORS.primary : COLORS.gray},
            ]}>
            Add
          </Text>
        </TouchableOpacity>
        <TabButton
          navigation={navigation}
          route={routes[1]}
          isFocused={state.index === 1}
          descriptors={descriptors}
        />
      </SafeAreaView>
      <AddModal
        visible={visible}
        onRequestClose={() => setModalVisible(false)}
      />
    </>
  );
};

const TabButton: React.FC<TabButtonProps> = ({
  isFocused,
  descriptors,
  navigation,
  route,
}) => {
  const {options} = descriptors[route.key];
  const {name, key} = route;

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, [isFocused, key, navigation, route.name]);

  const icons = iconsObj[name];

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      style={styles.tab}>
      <View>{isFocused ? icons.isActive : icons.inActive}</View>
      <Text
        style={[
          styles.tabLabel,
          {color: isFocused ? COLORS.primary : COLORS.gray},
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: heightPercentage(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 3,
    borderColor: COLORS.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontWeight: '500',
    fontSize: fontSz(15),
  },
  addBtn: {
    // paddingTop: heightPercentage(16),
  },
});

export default TabBarComponent;
