import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AddButtonContext} from '../contexts/AddButtonContext';
import COLORS from '../color';
import {fontSz} from '../config';
import Add_Active from '../../assets/svg/add-active.svg';

interface Props {
  btnStyle: any;
}

const AddButton: React.FC<Props> = ({btnStyle}) => {
  const buttonContext = React.useContext(AddButtonContext);
  const {onPress, modalVisible} = buttonContext;
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Add_Active width={33} />
      <Text
        style={[
          styles.tabLabel,
          {color: modalVisible ? COLORS.primary : COLORS.gray},
        ]}>
        Add
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: '500',
    fontSize: fontSz(15),
  },
});

export default AddButton;
