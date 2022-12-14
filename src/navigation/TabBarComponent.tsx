import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import Home_active from '../../assets/svg/home-active.svg';
import Home_inactive from '../../assets/svg/home-inactive.svg';
import Add_Inactive from '../../assets/svg/add-inactive.svg';
import Add_Active from '../../assets/svg/add-active.svg';
import Guide_Inactive from '../../assets/svg/guide-inactive.svg';
import Guide_active from '../../assets/svg/guide-active.svg';
import {heightPercentage, widthPercentage, fontSz} from '../config';
import COLORS from '../color';
import AddModal from '../Screens/Add';

const iconsObj = {
  Home: {
    inActive: (
      <Home_inactive
        height={heightPercentage(31)}
        width={widthPercentage(33)}
      />
    ),
    isActive: (
      <Home_active height={heightPercentage(31)} width={widthPercentage(33)} />
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
      <Guide_active height={heightPercentage(31)} width={widthPercentage(33)} />
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
          <Add_Active
            height={heightPercentage(31)}
            width={widthPercentage(33)}
          />
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
    alignItems: 'center',
    paddingBottom: heightPercentage(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderColor: COLORS.background,
    height: heightPercentage(82),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: heightPercentage(16),
    justifyContent: 'center',
  },
  tabLabel: {
    fontWeight: '500',
    fontSize: fontSz(15),
    textAlign: 'center',
  },
  addBtn: {
    marginTop: heightPercentage(13),
  },
});

export default TabBarComponent;
