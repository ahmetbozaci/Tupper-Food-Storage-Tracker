import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../color';
import AppHeader from '../../shared/AppHeader';
import TopTab from '../../navigation/TopTab';
import LogoutModal from '../../shared/LogoutModal';
import {useAppDispatch} from '../../features/store';
import {logout} from '../../features/loginSlice';
import {removeNotificationToken} from '../../api/auth';

const Foods: React.FC = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

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
      <TopTab />
      <LogoutModal
        visible={logoutModalVisible}
        close={toggleLogoutModal}
        logout={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Foods;
