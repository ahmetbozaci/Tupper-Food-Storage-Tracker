import {Text, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import TemperatureStorage from './guides';
import AppHeader from '../../shared/AppHeader';
import {useAppDispatch} from '../../features/store';
import {logout} from '../../features/loginSlice';
import LogoutModal from '../../shared/LogoutModal';
import {removeNotificationToken} from '../../api/auth';

const Guide = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!logoutModalVisible);
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    toggleLogoutModal();
    removeNotificationToken();
    setTimeout(() => {
      dispatch(logout());
    }, 300);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader onLogoutPress={toggleLogoutModal} />
      <View style={styles.content}>
        <LogoutModal
          visible={logoutModalVisible}
          close={toggleLogoutModal}
          logout={handleLogout}
        />
        <Text style={styles.guideTitle}>Storage Guide</Text>
        <TemperatureStorage />
      </View>
    </SafeAreaView>
  );
};

export default Guide;
