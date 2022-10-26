import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {heightPercentage, widthPercentage} from '../../config';
import Caret from '../../../assets/svg/caret-left.svg';

const Back = () => {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback>
        <Caret />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: heightPercentage(60),
    marginLeft: widthPercentage(30),
  },
});

export default Back;
