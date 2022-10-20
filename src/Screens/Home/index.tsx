import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../color';
import AppHeader from '../../shared/AppHeader';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
import DATA from '../../../assets/mock/data';
import AddIcon from '../../../assets/svg/add.svg';
import ChevronRight from '../../../assets/svg/chevron-right.svg';
import LogoutModal from '../../shared/LogoutModal';
import {logout} from '../../features/loginSlice';
import {useAppDispatch} from '../../features/store';

interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

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
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Welcome!</Text>
        {DATA.storages.map(storage => {
          const {id, title, items, logo} = storage;
          return (
            <TouchableOpacity
              key={id}
              style={styles.storageView}
              onPress={() => navigation.navigate('Foods', {screen: title})}>
              <ImageBackground
                source={logo}
                resizeMode="cover"
                style={styles.backgroundImage}>
                <View style={styles.spacedView}>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.title}>{title}</Text>
                      <TouchableOpacity>
                        <AddIcon width={widthPercentage(22)} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.unit}>{items.length} items</Text>
                  </View>
                  <TouchableOpacity>
                    <ChevronRight width={widthPercentage(12)} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
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
