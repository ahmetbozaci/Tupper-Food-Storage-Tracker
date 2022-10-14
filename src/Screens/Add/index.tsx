import {Text, TouchableOpacity, StyleSheet, Modal, View} from 'react-native';
import React from 'react';
import COLORS from '../../color';
import {heightPercentage} from '../../config';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

const Add: React.FC<Props> = ({visible, onRequestClose}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.modalContainer} onPress={onRequestClose}>
        <View style={[styles.modalContent]}>
          <Text>Heyyyyyyyyyy</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: heightPercentage(82),
  },
  modalContent: {
    backgroundColor: 'red',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: 200,
  },
});

export default Add;
