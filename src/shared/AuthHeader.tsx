import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {heightPercentage, widthPercentage} from '../config';
import Caret from '../../assets/svg/caret-left.svg';

interface Props {
  navigation: any;
}

const AuthHeader: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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

export default AuthHeader;
