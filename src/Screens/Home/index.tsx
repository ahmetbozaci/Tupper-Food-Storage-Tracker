import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../color';
import AppHeader from '../../shared/AppHeader';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
import AddIcon from '../../../assets/svg/add.svg';
import ChevronRight from '../../../assets/svg/chevron-right.svg';
import LogoutModal from '../../shared/LogoutModal';
import {logout} from '../../features/loginSlice';
import {fetchStorages, fetchFoodsByStorage} from '../../api/food';
import {useQuery} from '@tanstack/react-query';
import {useAppDispatch} from '../../features/store';

interface Props {
  navigation: any;
}

// interface CardProp {
//   item: any;
// }

const Home: React.FC<Props> = ({navigation}) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const {data, isLoading} = useQuery(['storages'], () => fetchStorages(), {
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

  // const Card: React.FC<CardProp> = ({item}) => {
  //   const {id, title, items, logo} = item;
  //   return (
  //     <TouchableWithoutFeedback
  //       key={id}
  //       onPress={() => navigation.navigate('Foods', {screen: title})}>
  //       <View style={styles.storageView}>
  //         <ImageBackground
  //           source={logo}
  //           resizeMode="cover"
  //           style={styles.backgroundImage}>
  //           <View style={styles.spacedView}>
  //             <View>
  //               <View style={styles.row}>
  //                 <Text style={styles.title}>{title}</Text>
  //                 <TouchableOpacity>
  //                   <AddIcon width={widthPercentage(22)} />
  //                 </TouchableOpacity>
  //               </View>
  //               <Text style={styles.unit}>{items.length} items</Text>
  //             </View>
  //             <TouchableOpacity>
  //               <ChevronRight width={widthPercentage(12)} />
  //             </TouchableOpacity>
  //           </View>
  //         </ImageBackground>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
  // };

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader onLogoutPress={toggleLogoutModal} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Welcome!</Text>
        {/* <Card item={fridge} />
        <Card item={pantry} />
        <Card item={freezer} /> */}
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
                            <TouchableOpacity>
                              <AddIcon width={widthPercentage(22)} />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.unit}>
                            {items} {items < 2 ? 'item' : 'items'}
                          </Text>
                        </View>
                        <TouchableOpacity>
                          <ChevronRight width={widthPercentage(12)} />
                        </TouchableOpacity>
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
