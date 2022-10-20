import {View, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {widthPercentage} from '../config';

interface BottomSheetProps {
  visible?: boolean;
  children: any;
  contentStyle?: {};
}

const CustomModal: React.FC<BottomSheetProps> = ({
  visible,
  children,
  contentStyle,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: widthPercentage(31),
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 25,
  },
});

export default CustomModal;
