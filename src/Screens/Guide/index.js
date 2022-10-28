import {Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import TemperatureStorage from './guides';
import AppHeader from '../../shared/AppHeader';
import {useAppDispatch} from '../../features/store';
import {logout} from '../../features/loginSlice';
import LogoutModal from '../../shared/LogoutModal';

const Guide = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!logoutModalVisible);
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    toggleLogoutModal();
    setTimeout(() => {
      dispatch(logout());
    }, 300);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader onLogoutPress={toggleLogoutModal} />
      <LogoutModal
        visible={logoutModalVisible}
        close={toggleLogoutModal}
        logout={handleLogout}
      />
      <Text style={styles.guideTitle}>Storage Guide</Text>
      <TemperatureStorage />
    </SafeAreaView>
  );
};

export default Guide;
