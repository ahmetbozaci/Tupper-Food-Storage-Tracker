import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomModal from './Modal';
import {fontSz, heightPercentage, widthPercentage} from '../config';
import COLORS from '../color';
import CustomButton from '../shared/Button';

interface Props {
  visible: boolean;
  close: () => void;
  logout: () => void;
}

const LogoutModal: React.FC<Props> = ({visible, close, logout}) => {
  return (
    <CustomModal visible={visible} contentStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>
        Are you sure you want to {'\n'}log out?
      </Text>
      <View style={styles.btnWrapper}>
        <CustomButton
          buttonText="No"
          buttonStyle={[styles.button, {backgroundColor: COLORS.gray}]}
          buttonTextStyle={styles.btnText}
          onPress={close}
        />
        <CustomButton
          buttonText="Yes"
          buttonStyle={styles.button}
          buttonTextStyle={styles.btnText}
          onPress={logout}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: widthPercentage(35),
    paddingVertical: heightPercentage(40),
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: fontSz(20),
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: heightPercentage(50),
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: widthPercentage(120),
    paddingVertical: heightPercentage(13),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default LogoutModal;
