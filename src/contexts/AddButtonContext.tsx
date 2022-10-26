import React from 'react';

export const AddButtonContext = React.createContext({
  onPress: () => {},
  modalVisible: false,
  closeModal: () => {},
});
