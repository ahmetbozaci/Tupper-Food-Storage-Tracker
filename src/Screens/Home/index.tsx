import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../color';
import AppHeader from '../../shared/AppHeader';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
// import AddIcon from '../../../assets/svg/add.svg';
import ChevronRight from '../../../assets/svg/chevron-right.svg';
import LogoutModal from '../../shared/LogoutModal';
import {logout} from '../../features/loginSlice';
import {
  fetchStorages,
  fetchFoodsByStorage,
  fetchAllFoods,
} from '../../api/food';
import {useQuery} from '@tanstack/react-query';
import {useAppDispatch} from '../../features/store';
import messaging from '@react-native-firebase/messaging';
import {saveTokenToDB, removeNotificationToken} from '../../api/auth';

interface Props {
  navigation: any;
}

const requestFCMPermission = async () => {
  const response = await messaging().requestPermission();
  const enabled =
    response === messaging.AuthorizationStatus.AUTHORIZED ||
    response === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    // console.log('fcmToken', fcmToken);
    saveTokenToDB(fcmToken);
  }
};

const Home: React.FC<Props> = ({navigation}) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const {data, isLoading} = useQuery(['storages'], () => fetchStorages(), {
    enabled: true,
    retry: true,
  });
  useQuery(['allfoods'], () => fetchAllFoods(), {
    enabled: true,
    retry: true,
  });
  useQuery(['Fridge'], () => fetchFoodsByStorage('Fridge'), {
    enabled: true,
    retry: true,
  });
  useQuery(['Pantry'], () => fetchFoodsByStorage('Pantry'), {
    enabled: true,
    retry: true,
  });
  useQuery(['Freezer'], () => fetchFoodsByStorage('Freezer'), {
    enabled: true,
    retry: true,
  });

  useEffect(() => {
    requestFCMPermission();

    // listen to token change
    return messaging().onTokenRefresh(token => {
      saveTokenToDB(token);
    });
  }, []);

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
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Welcome!</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {data.map((storage: any) => {
              const {id, title, items, logo} = storage;
              return (
                <TouchableWithoutFeedback
                  key={id}
                  onPress={() =>
                    navigation.navigate('Foods', {
                      screen: title,
                    })
                  }>
                  <View style={styles.storageView}>
                    <ImageBackground
                      source={{uri: logo}}
                      resizeMode="cover"
                      style={styles.backgroundImage}>
                      <View style={styles.spacedView}>
                        <View>
                          <View style={styles.row}>
                            <Text style={styles.title}>{title}</Text>
                            {/* <TouchableOpacity>
                              <AddIcon width={widthPercentage(22)} />
                            </TouchableOpacity> */}
                          </View>
                          <Text style={styles.unit}>
                            {items} {items < 2 ? 'item' : 'items'}
                          </Text>
                        </View>
                        <View>
                          <ChevronRight width={widthPercentage(12)} />
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </>
        )}
        <LogoutModal
          visible={logoutModalVisible}
          close={toggleLogoutModal}
          logout={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: widthPercentage(31),
    paddingTop: heightPercentage(48),
    paddingBottom: heightPercentage(10),
  },
  headerText: {
    fontWeight: '700',
    fontSize: fontSz(36),
    color: COLORS.black,
    marginBottom: heightPercentage(40),
  },
  storageView: {
    width: '100%',
    height: heightPercentage(167),
    backgroundColor: COLORS.gray,
    marginVertical: heightPercentage(10),
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: widthPercentage(20),
    opacity: 0.8,
  },
  spacedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: fontSz(24),
    color: COLORS.white,
    marginRight: widthPercentage(5),
  },
  unit: {
    fontWeight: '500',
    fontSize: fontSz(12),
    color: COLORS.white,
  },
  modalContent: {
    height: 200,
  },
});

export default Home;
